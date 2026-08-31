# Motion Design & Framer Motion Skill

## Purpose
Create premium, performant animations that enhance UX without distracting from content. Focus: scroll reveals, hover effects, page transitions, and 3D depth.

## Motion Design Principles

### 1. Purpose-Driven
- **Every animation serves a function**: Guides attention, clarifies interaction, or delights user.
- **No aimless motion**: Avoid animations just "because it's cool".
- **CTA emphasis**: Draw eyes to "Request Quote" buttons via subtle scale or glow effect.

### 2. Performance-First
- **60 FPS target**: Use `transform` and `opacity` only (GPU-accelerated).
- **Avoid layout shifts**: No animate position/width; use CSS Grid + `transform: translateX()`.
- **Lazy reduce**: Respect `prefers-reduced-motion` media query for accessibility.

### 3. Export-Professional Tone
- **Smooth, premium feel**: Easing curves (ease-in-out), duration 300-600ms.
- **No bouncy/playful**: This is B2B industrial, not a game; tone should be sophisticated.
- **Subtle motion**: 5-10% scale changes, not dramatic 50% zooms.

## Framer Motion Implementation

### Setup & Config

```tsx
// lib/motion.ts (Framer Motion animation library)
import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const scaleHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

export const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
```

### Scroll Reveal Pattern

```tsx
// components/ScrollReveal.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ScrollReveal({ children, variant = "fadeIn" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const variants = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
```

### Hover Effects on Cards

```tsx
// components/ProductCard.tsx
"use client";
import { motion } from "framer-motion";

export function ProductCard({ product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white rounded-lg p-6 border border-slate-200"
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-4 text-navy font-semibold">{product.name}</h3>
      <p className="text-sm text-slate-600">Source: {product.manufacturer}</p>
      <motion.button
        whileHover={{ backgroundColor: "#0B7A72" }}
        className="mt-4 w-full bg-teal text-white py-2 rounded"
      >
        Request Quote
      </motion.button>
    </motion.article>
  );
}
```

### Page Transition

```tsx
// app/layout.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Staggered List Animation

```tsx
// components/ProductGrid.tsx
"use client";
import { motion } from "framer-motion";

export function ProductGrid({ products }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Animation Catalogue

### 1. **Button Hover**
```tsx
whileHover={{ 
  scale: 1.05,
  boxShadow: "0 10px 20px rgba(11, 122, 114, 0.2)"
}}
transition={{ duration: 0.2, ease: "easeInOut" }}
```
**Use for**: "Request Quote", CTA buttons.

### 2. **Card Hover**
```tsx
whileHover={{ 
  scale: 1.03,
  y: -5,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
}}
transition={{ duration: 0.3, ease: "easeInOut" }}
```
**Use for**: Product cards, market cards.

### 3. **Scroll Fade-In**
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
viewport={{ once: true, margin: "-50px" }}
```
**Use for**: Sections, hero content, trust badges.

### 4. **Staggered Reveal**
```tsx
containerVariants: {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // 150ms between each child
      delayChildren: 0.1,      // 100ms before first child
    },
  },
}
```
**Use for**: Product grids, feature lists, testimonials.

### 5. **Icon Float**
```tsx
animate={{ y: [-5, 5, -5] }}
transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
```
**Use for**: Decorative elements, confidence badges (subtle, non-distracting).

### 6. **Page Transition**
```tsx
// Fade + slight upward shift
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3, ease: "easeInOut" }}
```
**Use for**: Full page layout wraps (on route change).

## Performance Best Practices

### GPU-Accelerated Properties (Use These)
- `transform: translate()`, `rotate()`, `scale()`
- `opacity`

**Why**: These don't trigger layout recalculations; GPU handles rendering.

```tsx
// ✓ Good
whileHover={{ scale: 1.05, y: -5 }}  // Uses transform

// ✗ Bad
whileHover={{ width: 110, height: 110 }}  // Triggers layout recalc
```

### Avoid These in Animations
- `width`, `height`, `left`, `top`, `margin` (trigger layout shift)
- `box-shadow` (expensive; use sparingly or reduce blur radius)

### Accessibility: Respect Motion Preferences

```tsx
// lib/motion.ts
const shouldReduceMotion = () => 
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const safeMotionVariants = (fullMotion, reducedMotion) => 
  shouldReduceMotion ? reducedMotion : fullMotion;

// Usage
const variants = safeMotionVariants(
  { scale: 1.05 },  // Full motion
  { scale: 1 }      // Reduced motion (no scale)
);
```

## 3D Effects (Advanced)

### Perspective Tilt on Hover (Optional)
```tsx
whileHover={{
  rotateX: 2,
  rotateY: -2,
  perspective: 1000,
}}
```
**Use for**: Premium product showcase (hero section, featured products).

### Gradient Animation (Subtle)
```tsx
<motion.div
  animate={{
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  style={{
    backgroundImage: "linear-gradient(-45deg, #0E2040, #0B7A72, #B8720A)",
    backgroundSize: "200% 200%",
  }}
/>
```
**Use for**: Hero background, call-to-action section headers.

## Troubleshooting

### Animation Jank (Stuttering)
- **Check**: Are you animating non-GPU properties? (width, height, etc.)
- **Fix**: Use `transform` instead. E.g., `width → scaleX`, `height → scaleY`.

### Animations Fire Too Often
- **Check**: Are InView triggers firing repeatedly?
- **Fix**: Add `triggerOnce: true` to `useInView` hook.

### Motion Too Fast/Slow
- **Reference speeds**:
  - Hover effects: 200-300ms
  - Scroll reveals: 500-700ms
  - Page transitions: 300ms
  - Staggered reveals: 100-150ms between items

---

## Integration Points

- **Framer Motion version**: 11.0.0+
- **React version**: 18.3.0+
- **Tailwind CSS**: For base styling; Framer handles motion.
- **Lighthouse**: Monitor FPS; target 60 FPS, Lighthouse 90+.
