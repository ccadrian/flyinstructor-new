# Design System: flyinstructor.com

The single source of truth for how flyinstructor.com looks and moves. Build every new page or section from these rules. The live reference implementation is `index.html`; tokens live at the top of its `<style>` block.

## 1. Visual Theme & Atmosphere

A confident, instrument-panel calm. The page reads like a well-kept flight bag: warm paper, black ink, one precise blue, and nothing that does not earn its place. Headlines are heavy, uppercase and tightly packed like aircraft livery; everything around them is quiet, airy and exact. The tone is a solo instructor you trust with your life: direct, warm, unflashy.

- **Density:** Art Gallery Airy (3). Big section gaps, short paragraphs, one idea per section.
- **Variance:** Offset Asymmetric (6). Left-aligned heroes, a sticky split for the process, a staggered testimonial pair. Never a centered hero.
- **Motion:** Fluid CSS (5). Entry reveals and tactile hover feedback; decorative motion settles and stops.
- **Signature motif:** the logo mark (a circle cut by a horizon line) doubles as an artificial horizon. It appears as the hero attitude indicator, the faint rings in the CTA panel, and the banking logo on hover.

## 2. Color Palette & Roles

One palette, warm neutrals only, one accent. Light and dark mode follow the visitor's system setting (`prefers-color-scheme`).

| Role | Light | Dark | Used for |
|---|---|---|---|
| **Flight-bag Paper** | `#FAFAF7` | `#121211` | Page background, card cores |
| **Hangar Tint** | `#F1EFE9` | `#1A1A18` | Alternate section background, placeholders |
| **Logbook Ink** | `#141413` | `#EDEBE5` | Primary text, primary buttons |
| **Pencil Grey** | `#67645D` | `#A39F95` | Secondary text, labels, metadata (5.1:1 or better on both backgrounds) |
| **Ruled Line** | `#DEDBD3` | `#2E2D29` | Dividers, tag outlines, dial case |
| **Field Edge** | `#8D897F` | `#6F6B62` | Form field underlines (at least 3:1 against the page) |
| **Horizon Blue** | `#2D47E0` | `#8C9CF0` | The only accent: primary hover, active nav, links, focus ring, key numbers, the aircraft symbol |
| **Night Panel** | `#141413` | `#1A1E33` | The single CTA panel, with a soft blue radial glow from the top right |
| **Alert Red** | `#B42318` | `#F97066` | Form errors only |

Rules:
- Horizon Blue is the only accent on every page. Saturation stays below 80% in both modes.
- Never pure black or pure white. Never a second accent, never a gradient on text.
- Shadows are tinted with Logbook Ink and extremely diffuse (`0 14px 36px -18px rgba(20,20,19,0.22)` or softer).
- A fixed, pointer-events-none paper grain sits over everything at 3.5% (6% in dark mode).

## 3. Typography Rules

All fonts are self-hosted from `/fonts` (Latin subset, SIL OFL). Never link Google Fonts: the privacy policy does not cover it.

- **Display: Archivo (900)**. Uppercase, tracking `-0.025em` to `-0.03em`, line-height `0.95` to `1`. Hero headline `clamp(34px, 4.6vw, 66px)` and always two lines on desktop; section headings `clamp(34px, 5.2vw, 64px)`. Hierarchy comes from weight and the blue second line, not from ever-larger sizes.
- **Body: Geist (400 to 600)**. Line-height `1.55` to `1.6`, paragraphs capped around 31 to 34em. Secondary copy in Pencil Grey. The about statement uses Geist 500 at up to 42px with `-0.025em` tracking.
- **Mono: Geist Mono (400 to 500)**. Buttons, nav, labels, tags, durations, captions. Small (11 to 14px). Uppercase with `0.1em` to `0.14em` tracking only for form labels and the one eyebrow.
- **Logo: Barlow Condensed (600)**. Wordmark only.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Numbers in comparisons use tabular figures.
- Banned: Inter, Roboto, Arial as a design choice, any serif.

## 4. Component Stylings

Shape system (fixed, do not mix): interactive elements are full pills (`999px`); containers are a double bezel with a 28px outer tray and a 22px inner core; labels and tags are 6px.

- **Primary button:** Logbook Ink pill, mono label, min height 56px, and the arrow sitting in its own 42px circle flush with the right edge (button-in-button). Hover: fills Horizon Blue, lifts 2px, the arrow circle nudges right and grows 6%. Active: `scale(0.98)`. Labels stay short and never wrap ("Book a Discovery Flight").
- **Secondary action:** a plain mono text link with a thin underline, never a second filled or ghost button. At most one per hero.
- **Navigation:** a floating glass pill detached 12px from the top, with a hairline ring and soft float shadow. Active section gets a blue tint. On mobile the two-line burger morphs into an X and opens a full-screen frosted overlay whose links slide up in a stagger.
- **Double bezel:** an outer tray (`rgba(20,20,19,0.035)`, hairline ring, 6px padding) holding a core with its own background and a 1px top highlight. Used for the CTA panel, testimonial cards and the instructor photo. Not used for list rows.
- **Course rows:** no cards. A 2-column grid on desktop, each row a link with a mono code tag (DISC, PPL, IR…), title, description and duration, separated by straight hairlines. Hover tints the row blue and slides the content 8px.
- **Inputs:** label above (mono, uppercase), underline field, error text below. Focus turns the underline blue and adds a faint blue wash. Invalid fields (after interaction) turn the underline red and show the hint.
- **Form feedback:** "Sending…" on the button while busy; success and error lines carry a Phosphor icon plus text, never color alone.
- **Icons:** Phosphor, Light weight only, inline SVG. No hand-drawn icon paths, no emoji or symbol glyphs (✓, →, ☰).
- **Status dot:** exactly one on the page, and only because it reports a real state (accepting new students).

## 5. Layout Principles

- Content is capped at 1312px and centred; the side gutter is `clamp(20px, 5vw, 64px)` plus safe-area insets.
- Sections breathe: 128px top and 144px bottom on desktop, 80 to 88px on mobile. Bottom padding is always a little larger than top.
- Hero: left-aligned, headline across the full width, copy and actions below on the left, the attitude indicator on the right rising into the empty space beside the short second line. CTA visible in the first viewport at 1080px and up.
- Every section uses a different layout family: hero split, photo plus statement, 2-column course grid, framed CTA panel, sticky-heading route with waypoint markers, staggered testimonial pair, text plus form.
- No eyebrows above section headings, except the contact section. No section-number labels.
- Below 768px everything collapses to one column. No horizontal scroll at 320px. Touch targets at least 44px.
- The fixed nav never hides content: `scroll-padding-top` matches its height.

## 6. Motion & Interaction

- Easing: `cubic-bezier(0.32, 0.72, 0, 1)` for interaction, `cubic-bezier(0.16, 1, 0.3, 1)` for reveals, a slight overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)` for number pops. Never `linear` or `ease-in-out` for movement.
- Reveals: sections fade up 32px over about 0.8s as they enter the viewport (IntersectionObserver), with children staggered 60 to 80ms apart. Content stays visible when JavaScript is off.
- Decorative motion is finite. The attitude indicator banks once and settles within 5 seconds; the status dot pulses twice. No infinite loops (WCAG 2.2.2), even though some taste skills ask for them.
- Only `transform` and `opacity` animate. Blur lives only on fixed layers (nav, menu overlay).
- `prefers-reduced-motion` removes all movement, including smooth scrolling and the count-up.
- Page-to-page navigation uses cross-document view transitions where the browser supports them.

## 7. Anti-Patterns (Banned)

- Emojis or symbol glyphs as icons; hand-drawn icon SVGs
- Inter, serif fonts, Google Fonts loaded from Google
- Pure black or white, a second accent, purple or neon glows, gradient text
- Centered hero, headlines longer than two lines on desktop, CTA labels that wrap
- Eyebrow labels on every section, "ABOUT ME" style meta labels, section numbering
- Three equal cards in a row, cards around list items, labels or pills laid over photos
- Infinite decorative animation, scroll cues ("Scroll to explore"), custom cursors
- Em dashes anywhere visible (use commas, colons or periods; ranges use a hyphen: 6-12 mo)
- Invented testimonials, names or numbers presented as real; AI clichés like "elevate", "seamless", "unleash"
- Placeholder copy shipped as final; the bracketed placeholders in `index.html` mark content only the instructor can supply
