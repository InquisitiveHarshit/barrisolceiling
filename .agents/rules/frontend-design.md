# Borocelling Frontend Design Rules

## 1. Impeccable Anti-Patterns (Enforced)
- **Typography**: Do NOT use overused fonts (Arial, Inter, system defaults). Prefer `Space Grotesk` or other elegant sans/serifs.
- **Color**: Do NOT use pure black or pure gray (always tint with the brand color). Do NOT put gray text on colored backgrounds.
- **Layout**: Do NOT wrap everything in generic cards or nest cards inside cards.
- **Motion**: Do NOT use bounce/elastic easing (it feels dated).

## 2. Project-Specific Aesthetic (Design Taste)
- **Vibe**: Premium Architecture & Luxury Interiors.
- **Theme Constraints**: The site strictly uses a Pure White (`#ffffff`) background with a high-contrast Brand Purple (`#633588`) for primary accents, buttons, and headings.
- **Spacing & Scale**: Adhere to the Hero Top Padding Cap (e.g., `pt-24` equivalent). Do not use oversized hero fonts; scale them down to feel elegant and restrained (e.g. `clamp(2rem, 3.5vw, 3.5rem)`).

## 3. Structural Hard-Rules (Learned via Iteration)
- **Sticky Navbar**: Always use `position: fixed; top: 0; left: 0; right: 0;` (along with a high z-index and backdrop blur) for the header. Do not use `position: sticky` on the navbar, as it breaks when parent wrappers use `overflow-x: hidden`.
- **Vertical Logo Constraint**: When rendering the vertical brand logo in the navbar, it MUST be wrapped in a strictly constrained square container (e.g., `72x72px`) with the next/image set to `width: 100%; height: 100%; object-fit: contain`. Never use `height: auto` on a constrained width, as it causes severe vertical blowout.
- **Hero Stacking**: The hero section must NOT be sticky. It should naturally scroll up to be covered by subsequent content if needed, but its wrapper should maintain standard document flow.

## 4. High-End UI Patterns (Established on Homepage)
- **Card Architecture**: Use the "Double-Bezel" (Doppelrand) pattern. Wrap an inner content core (solid white, inner shadow) with a slightly padded outer shell (tinted background, 1px semi-transparent border).
- **Buttons**: Implement the "Button-in-Button" pattern. CTAs should have a pill shape with a distinct circular icon container inside them that translates/scales on hover.
- **Layout Grids**: Avoid perfectly symmetric boxes. Use Asymmetric Bento grids (e.g., 55/45 splits, tall vs short cards) to create an editorial feel.
- **Spacing**: Use macro-whitespace. Major sections must have massive padding (e.g., `112px 0`) to feel airy and luxurious.
- **Motion**: All future animations must adhere to Emil Kowalski's principles (installed via `@emil-design-eng`). Default to cubic-bezier spring curves (e.g., `0.32, 0.72, 0, 1`) and avoid generic linear or ease-in-out transitions.
