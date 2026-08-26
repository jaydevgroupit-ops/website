import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EXPORT_EMAIL, SITE_NAME } from '@/lib/site';

/**
 * RFQ endpoint. Email notification to the sales inbox (Resend) is the only
 * primary channel; an optional generic webhook can mirror submissions
 * elsewhere. Everything is env-driven so the route never throws just because
 * a channel isn't configured.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || EXPORT_EMAIL;
const NOTIFICATION_FROM_EMAIL =
  process.env.NOTIFICATION_FROM_EMAIL || `${SITE_NAME} <noreply@jaydevgroup.co.in>`;

const WEBHOOK = process.env.QUOTE_WEBHOOK_URL || '';
const emailEnabled = Boolean(RESEND_API_KEY);

const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Quote = {
  product?: string; quantity?: string; unit?: string; destinationPort?: string;
  incoterm?: string; packaging?: string; name?: string; company?: string;
  email?: string; phone?: string; country?: string; notes?: string;
};

function buildEmail(q: Quote) {
  const rows: [string, string][] = [
    ['Product', `${q.product || '—'}`],
    ['Quantity', `${q.quantity || '—'} ${q.unit || ''}`.trim()],
    ['Incoterm', q.incoterm || '—'],
    ['Destination Port', q.destinationPort || '—'],
    ['Packaging', q.packaging || '—'],
    ['Contact', q.name || '—'],
    ['Company', q.company || '—'],
    ['Country', q.country || '—'],
    ['Email', q.email || '—'],
    ['Phone', q.phone || '—'],
    ['Notes', q.notes || '—'],
  ];
  const html = `
  <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;color:#0E2040">
    <div style="background:#0E2040;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
      <div style="font-weight:800;font-size:18px">New RFQ — Jaydev Group</div>
      <div style="color:#E8B84B;font-size:13px;margin-top:2px">Request for Quote submitted on the website</div>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-top:0">
      ${rows
        .map(
          ([k, v], i) =>
            `<tr style="background:${i % 2 ? '#FAFBFC' : '#fff'}">
               <td style="padding:10px 16px;font-size:13px;color:#6b7280;font-weight:600;width:38%;border-bottom:1px solid #F1F5F9">${esc(k)}</td>
               <td style="padding:10px 16px;font-size:14px;color:#0E2040;border-bottom:1px solid #F1F5F9">${esc(v)}</td>
             </tr>`,
        )
        .join('')}
    </table>
    <div style="padding:14px 16px;font-size:12px;color:#9ca3af">Reply directly to this email to respond to the buyer.</div>
  </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  return { html, text };
}

async function sendEmail(q: Quote) {
  const resend = new Resend(RESEND_API_KEY);
  const { html, text } = buildEmail(q);
  const { error } = await resend.emails.send({
    from: NOTIFICATION_FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    replyTo: q.email || undefined,
    subject: `RFQ: ${q.product || 'Industrial chemicals'} — ${q.company || q.name || 'Website'}`,
    html,
    text,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

export async function POST(request: Request) {
  try {
    const q = (await request.json()) as Quote;

    if (!q.product || !q.name || !q.email || !/\S+@\S+\.\S+/.test(q.email)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const channels: Promise<void>[] = [];
    if (emailEnabled) channels.push(sendEmail(q));
    if (WEBHOOK) {
      channels.push(
        fetch(WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...q, receivedAt: new Date().toISOString() }),
        }).then(() => undefined),
      );
    }

    if (channels.length === 0) {
      // Email is the only real channel, so an unconfigured production deploy
      // would silently swallow every enquiry. Fail loudly there; stay lenient
      // in local dev so the form is still testable without a key.
      console.error('[quote] No notification channel configured (set RESEND_API_KEY).');
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Could not submit request' }, { status: 502 });
      }
      return NextResponse.json({ ok: true, warning: 'no-channel-configured' });
    }

    const results = await Promise.allSettled(channels);
    const failures = results.filter((r) => r.status === 'rejected') as PromiseRejectedResult[];
    failures.forEach((f) => console.error('[quote] channel failed:', f.reason));
    if (failures.length === results.length) {
      return NextResponse.json({ error: 'Could not submit request' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[quote] error:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Quote endpoint is live', emailEnabled });
}
