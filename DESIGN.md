---
version: alpha
name: mehenk
description: Linear/Cursor register — dark-first SaaS, violet+cyan accent, geist/inter typography. Built for developers and AI agents. Light mode native fallback via semantic token swap.
colors:
  primary: "#7c5cff"
  secondary: "#06b6d4"
  tertiary: "#ec4899"
  neutral: "#fafafa"
  background: "#0a0a0a"
  surface: "#111111"
  surface-elevated: "#1a1a1a"
  border: "#1f1f1f"
  border-strong: "#2a2a2a"
  text-primary: "#fafafa"
  text-secondary: "#a1a1aa"
  text-tertiary: "#71717a"
  on-tertiary: "#ffffff"
  success: "#22c55e"
  warning: "#f59e0b"
  danger: "#ef4444"
  info: "#06b6d4"
  background-light: "#ffffff"
  surface-light: "#fafafa"
  text-primary-light: "#0a0a0a"
typography:
  display:
    fontFamily: Geist
    fontSize: 60px
    fontWeight: 600
    letterSpacing: -0.025em
    lineHeight: 1.05
  display-lg:
    fontFamily: Geist
    fontSize: 96px
    fontWeight: 600
    letterSpacing: -0.03em
    lineHeight: 1
  h1:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: 600
    letterSpacing: -0.02em
    lineHeight: 1.15
  h2:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: 600
    letterSpacing: -0.015em
    lineHeight: 1.2
  h3:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 600
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.04em
  mono:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  mono-sm:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 400
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  xl2: 16px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xl2: 32px
  xl3: 48px
  xl4: 64px
  xl5: 96px
duration:
  short1: 50ms
  short2: 100ms
  short3: 150ms
  short4: 200ms
  medium1: 250ms
  medium2: 300ms
  medium3: 350ms
  medium4: 400ms
  long1: 450ms
  long2: 500ms
  long3: 550ms
  long4: 600ms
  extra-long1: 700ms
  extra-long2: 800ms
  extra-long3: 900ms
  extra-long4: 1000ms
easing:
  emphasized: cubic-bezier(0.2, 0.0, 0, 1.0)
  emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1.0)
  emphasized-accelerate: cubic-bezier(0.3, 0.0, 0.8, 0.15)
  standard: cubic-bezier(0.2, 0.0, 0, 1.0)
  standard-decelerate: cubic-bezier(0, 0, 0, 1)
  standard-accelerate: cubic-bezier(0.3, 0, 1, 1)
  linear: cubic-bezier(0, 0, 1, 1)
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 40px
    typography: "{typography.body-sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-tertiary}"
  button-secondary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 40px
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 40px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 40px
  input-focus:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
  badge-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warning}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  badge-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  badge-info:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.info}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  code-block:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.mono}"
  tooltip:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 6px 10px
  toast-info:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
---

## Overview

**Linear meets Cursor.** Dark-first, geliştirici merkezli SaaS estetiği. Violet brand accent (`#7c5cff`) ile cyan secondary (`#06b6d4`) gradient'i — modern AI ürünlerinin ortak dili. Inter (body) + Geist (display/mono) — Vercel/Linear standardı. Yüksek kontrast, anlamlı whitespace, **mikro-etkileşim**ler net ama ölçülü.

mehenk'in iki yüzü var: **insan dashboard'u** (sidebar nav + KPI strip + flex grid — Linear/Vercel/Stripe pattern'i) ve **`/for-agents` landing'i** (terminal aesthetic — kod ön plan, dark monospace blokları, "agent's-eye view"). İkisi de aynı token sisteminden türer.

## Colors

- **Primary (`#7c5cff` violet):** Brand identity. Logo, primary CTA, focus halo, brand gradient stop A.
- **Secondary (`#06b6d4` cyan):** Highlight, hover state, gradient stop B, link.
- **Tertiary (`#ec4899` pink):** CTA emphasis, "premium" lozenge, attention badge.
- **Neutral (`#fafafa`):** Body text (dark mode). Light mode'da `#0a0a0a` swap.
- **Background/Surface:** `#0a0a0a` → `#111111` → `#1a1a1a` üç katmanlı derinlik. Light mode'da `#ffffff` → `#fafafa` → `#f4f4f5`.
- **Border:** `#1f1f1f` ince ayırıcı + `#2a2a2a` kuvvetli (focus, hover).
- **Semantic:** success (#22c55e), warning (#f59e0b), danger (#ef4444), info (#06b6d4 — secondary ile aynı, cognitive load azaltır).

**WCAG:** `#fafafa` on `#0a0a0a` 19.2:1 (AAA). `#a1a1aa` on `#0a0a0a` 7.0:1 (AAA). Primary `#7c5cff` text-as-text olarak büyük metin sınırında (3.5:1) — sadece arkaplan/icon olarak; gövde metin değil.

## Typography

**4 aile, net rol ayrımı:**

| Aile | Rol | Nerede |
|:-----|:----|:-------|
| **Geist** | Display + headings | Hero (60-96px), h1-h3, button text |
| **Inter** | Body | Tüm paragraf, form label, ikinci derece UI |
| **Geist Mono** | Code + caption | Kod blokları, terminal mockups, technical labels |

**Letter-spacing felsefesi:**
- Display: tight tracking (`-0.025em` to `-0.03em`) — magazine display
- Body: default (0) — okunabilirlik
- Caption/eyebrow: loose (`+0.04em`) — uppercase formal damga
- Mono: default — kod sertliği

**Display agresif kullanılır:** Hero başlık 60-96px, font-weight 600, line-height 1 — 2026 SaaS standardı (Linear, Vercel, Cursor). Compact ve self-confident.

## Layout

- **Container max-width:** 1200px (default), 1440px (dashboard tablo görünümleri)
- **Section padding:** 96-128px vertical (landing), 24-32px (app)
- **Sidebar:** 240-280px persistent (app — Linear/Vercel pattern)
- **Grid:** 12-column, gap 24px (lg), 16px (sm)
- **Touch hedef:** 40px (default button height), 44px+ (mobile)

## Motion

**Material 3 Motion token sistemi** — endüstri standardı, dökümante.

| Olay | Token | Easing |
|:-----|:------|:-------|
| Button hover | `short2` 100ms | `standard` |
| Hover lift / glow | `short3` 150ms | `standard` |
| Card enter | `medium2` 300ms | `emphasized-decelerate` |
| Modal in | `medium3` 350ms | `emphasized-decelerate` |
| Modal out | `short3` 150ms | `emphasized-accelerate` |
| Drawer slide | `medium3` 350ms | `emphasized-decelerate` |
| Page transition | `medium4` 400ms | `emphasized` |
| Toast | `medium1` 250ms | `emphasized-decelerate` |
| Streaming dot | döngü | `linear` |
| Skeleton shimmer | 1500ms döngü | `linear` |

**Reduce-motion (zorunlu):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

## Interaction states

| Durum | Visual | Token |
|:------|:-------|:------|
| **Default** | Base | base color/border |
| **Hover** | `bg-elevated` + `translate(-1px)` | duration `short3`, easing `standard` |
| **Active** | `translate(0)` + brightness 0.95 | duration `short1` |
| **Focus** | 2px primary ring + 2px offset | instant, no animation |
| **Disabled** | `opacity: 0.5`, `cursor: not-allowed` | no transition |

**Focus ring:** Tüm interaktif elemanlarda `:focus-visible` ile **primary** (`#7c5cff`) 2px ring + 2px offset. Mouse click'te görünmez (`focus-visible`'a saygı).

## Elevation & Depth

3 katman zemin (yukarıdaki "Colors" tablosunda). Gölge dili:

- **Card:** gölge **yok** — sadece surface-tier farkı (zemin → kart → elevated)
- **Floating:** `0 12px 32px rgba(0,0,0,0.4)` — toast, popover, dropdown
- **Modal:** `0 24px 64px rgba(0,0,0,0.6)` + backdrop blur(8px)

**Glow accents (sparingly):**
- Primary CTA hover: `0 0 24px rgba(124, 92, 255, 0.25)` — violet halo
- Active danger: `0 0 16px rgba(239, 68, 68, 0.3)` — red urgency
- Tek glow rule: bir ekran üzerinde max 1 element glow alır.

## Shapes

- **Default radius:** 6px (md) — buton, input, badge text non-pill
- **Cards:** 8px (lg) — surface containers
- **Modals/sheets:** 12px (xl)
- **Pills/chips:** 999px (pill) — status badge, atmo chip
- **Sharp:** 0px — sadece terminal mockup, code-block iç separator

Linear/Cursor radius dili: **küçük, ölçülü** — Apple iOS değil, geliştirici sertliği.

## Components

### button-primary
Violet bg + white text + 6px radius + 40px height. Hover'da glow halo + brightness 1.05. Active'de translate(0). Disabled'da opacity 0.5. Tek primary CTA bir görünümde (Linear pattern).

### button-secondary / button-ghost
Secondary: surface-elevated zemin, sınır yok. Ghost: zemin yok, sadece text + hover'da surface bg. İkisi de aynı 40px height.

### card / card-elevated
24px padding (lg). Card zemini surface; elevated bir kademe yukarıda. Border yok — sadece tier-farkı. Hover'da `translate(-2px)` opsiyonel (interactive cards için).

### code-block
Monospace, background tier-0 (`#0a0a0a`). Syntax highlighting: violet (keyword), cyan (function), pink (string), neutral (text). Vercel docs estetiği.

### badge (status)
4 varyant (success/warning/danger/info). Pill shape (999px). Background surface (subtle), text colorful. 2px 8px padding.

### tooltip / toast
Surface-elevated zemin + 6-8px radius. Toast 12px 16px padding. Tooltip 6px 10px. Toast 4 varyant (success/warning/danger/info) — sol border 3px renkli.

### sidebar nav (app)
240-280px width. Item height 36px. Icon + label. Active item: surface-elevated bg + primary 2px sol border. Section dividers 1px border-strong.

### KPI card (dashboard)
6 kartlık strip üst. Her kart: caption (label, 12px loose-tracking) + display number (28-36px) + delta indicator (success/danger + arrow). Linear's "Insights" pattern.

## Light mode

Token swap via `next-themes` `data-theme` attribute. Sadece semantic değişir:
- `background`: `#0a0a0a` ↔ `#ffffff`
- `surface`: `#111111` ↔ `#fafafa`
- `surface-elevated`: `#1a1a1a` ↔ `#f4f4f5`
- `text-primary`: `#fafafa` ↔ `#0a0a0a`
- `text-secondary`: `#a1a1aa` ↔ `#52525b`
- `border`: `#1f1f1f` ↔ `#e4e4e7`

Primary/secondary/tertiary değişmez — brand stays. Dark + light **birinci sınıf** (Pera Palas'tan farklı: cinematic dark-only değil).

## Do's and Don'ts

**Do**
- Bir görünümde **tek primary CTA**.
- Glow halo'yu hover'da, **bir element** üstünde kullan.
- Body Inter, display Geist, code Geist Mono — karıştırma.
- 40px button height tutarlı; mobile'da 44px aç.
- `prefers-reduced-motion` saygısı — duration → 0.001ms.
- Light mode'u ilk günden test et (next-themes ile token swap).

**Don't**
- Native `alert/confirm/prompt` — Pera Palas'tan kuralı taşıyoruz: themed modal.
- Raw hex Tailwind class (`bg-[#...]`) — semantic token name kullan (`bg-surface`, `text-primary`).
- z-index literal — `var(--z-*)` veya Tailwind semantic class.
- Cormorant/Crimson gibi serif font — mehenk register'ı modern sans-only.
- Gradient'ı her yerde — sadece hero, brand mark, CTA glow.
- 5'den fazla aktif renk bir ekranda.
