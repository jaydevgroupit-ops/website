import {
  SlidersHorizontal, LayoutGrid, List,
  Atom, Beaker, Droplets, Sparkles, FlaskConical, Hexagon, Wheat, Pickaxe,
  Flame, PaintBucket, Recycle, SprayCan, Pill, Shirt, ScrollText, Globe,
  Gem, Ship, Building2, Factory, Package, ShieldCheck, Truck, Clock, FileText,
  MessageCircle, Phone, Mail, MapPin, Search, ArrowRight, Check, ChevronRight,
  Menu, X, Anchor, Boxes, BadgeCheck, Headset, Handshake, Container,
  Download, FileDown, ChevronDown, Home,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  SlidersHorizontal, LayoutGrid, List,
  Atom, Beaker, Droplets, Sparkles, FlaskConical, Hexagon, Wheat, Pickaxe,
  Flame, PaintBucket, Recycle, SprayCan, Pill, Shirt, ScrollText, Globe,
  Gem, Ship, Building2, Factory, Package, ShieldCheck, Truck, Clock, FileText,
  MessageCircle, Phone, Mail, MapPin, Search, ArrowRight, Check, ChevronRight,
  Menu, X, Anchor, Boxes, BadgeCheck, Headset, Handshake, Container,
  Download, FileDown, ChevronDown, Home,
};

export function Icon({ name, className = 'w-5 h-5', strokeWidth = 1.75 }: { name: string; className?: string; strokeWidth?: number }) {
  const Cmp = MAP[name] ?? Hexagon;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export type { LucideIcon };
