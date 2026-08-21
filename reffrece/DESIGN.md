---
name: Lumina Architectural
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1eded'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1c'
  on-surface-variant: '#46474a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#76777b'
  outline-variant: '#c6c6ca'
  surface-tint: '#5e5e62'
  primary: '#090a0d'
  on-primary: '#ffffff'
  primary-container: '#202124'
  on-primary-container: '#88888c'
  inverse-primary: '#c7c6ca'
  secondary: '#5c5f60'
  on-secondary: '#ffffff'
  secondary-container: '#e1e3e4'
  on-secondary-container: '#626566'
  tertiary: '#0d0906'
  on-tertiary: '#ffffff'
  tertiary-container: '#25201c'
  on-tertiary-container: '#8f8781'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3e2e6'
  primary-fixed-dim: '#c7c6ca'
  on-primary-fixed: '#1a1b1e'
  on-primary-fixed-variant: '#46474a'
  secondary-fixed: '#e1e3e4'
  secondary-fixed-dim: '#c5c7c8'
  on-secondary-fixed: '#191c1d'
  on-secondary-fixed-variant: '#454748'
  tertiary-fixed: '#ebe0da'
  tertiary-fixed-dim: '#cfc5be'
  on-tertiary-fixed: '#1f1b17'
  on-tertiary-fixed-variant: '#4c4641'
  background: '#fcf8f8'
  on-background: '#1c1b1c'
  surface-variant: '#e5e2e1'
  brand-vibrancy: '#A3338E'
  muted-ink: '#3C4043'
  soft-border: '#E8EAED'
  luminary-white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 92px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

The design system is rooted in the intersection of architectural precision and ethereal light. It targets high-end residential and commercial clients seeking transformative interior solutions. The UI must evoke a sense of **serenity, expertise, and boundless space**, mimicking the effect of a perfectly installed stretch ceiling.

The chosen style is **Editorial Minimalism**. It relies on high-contrast typography, expansive negative space, and a rigorous underlying grid. This approach treats the interface as a luxury coffee-table book or a gallery catalog, ensuring that the vibrant, luminous ceiling installations remain the undisputed focal point of the experience. Visual noise is eliminated to allow the quality of the craftsmanship to speak for itself.

## Colors

The palette is designed to be "light-first" to maximize the perceived height and airiness of the layout, reflecting the product's core benefit.

- **Primary (Dark Charcoal):** Used for structural elements, borders, and authoritative typography. It provides the "ink" that defines the architectural boundaries of the page.
- **Secondary (Off-White):** Serves as the primary canvas. This specific off-white reduces glare while maintaining a premium, "gallery wall" feel.
- **Brand Accent (Magenta/Purple):** Derived from the logo, this color is reserved strictly for high-priority interactive elements (e.g., "Request a Quote") and subtle stylistic indicators like active tab underlines or bullet points.
- **Luminary White:** Pure white is used exclusively for card backgrounds and navigation surfaces to create a subtle "backlit" effect against the off-white background.

## Typography

Typography follows a high-contrast editorial hierarchy. 

**Playfair Display** provides the sophisticated, high-fashion serif look required for architectural headings. It should be used with tight tracking in larger sizes to feel impactful.

**Montserrat** is used for body copy and UI labels. It was selected for its geometric clarity and wide character set. Body text must maintain a generous `line-height` (at least 1.6x) to ensure the text blocks feel breathable and never "dense." For technical metadata or eyebrow headings, use `label-caps` to provide a functional, architectural contrast to the elegant serifs.

## Layout & Spacing

The system uses a **Fixed Grid** model for desktop to maintain the "magazine spread" composition. 

- **Desktop (1440px+):** A 12-column grid with generous 32px gutters. Section vertical spacing is intentionally aggressive (160px) to force a slow, contemplative scroll.
- **Tablet:** Transitions to an 8-column grid with 24px gutters.
- **Mobile:** A 4-column grid with 20px gutters.

**Layout Philosophy:** Use "Broken Grid" elements sparingly—such as images that bleed off the edge of the screen or overlapping text elements—to add a sense of dynamic architectural movement. Always prioritize whitespace over content density. If a section feels crowded, increase the padding rather than removing content.

## Elevation & Depth

To mirror the physical properties of stretch ceilings, depth is conveyed through **backlit translucency** rather than heavy shadows.

- **Surface Tiers:** Use the contrast between `secondary` (off-white) and `luminary-white` to indicate hierarchy. Floating menus and cards should use pure white.
- **Shadows:** Use only one level of elevation: a very soft, highly diffused "Ambient Glow" (Color: `primary` at 4% opacity, 40px blur, 0px offset). This should feel like the soft shadow cast by a recessed light.
- **Overlays:** Use semi-transparent blurs (Backdrop Filter: 20px blur) for navigation bars and modal backdrops to maintain a sense of environmental light passing through the interface.

## Shapes

The design system utilizes **Sharp (0px)** roundedness. Architectural integrity is represented through crisp, 90-degree angles and clean perpendicular lines. 

- **Buttons & Inputs:** Must be perfectly rectangular.
- **Image Frames:** Should use sharp edges, except when showcasing specific "curved ceiling" installations, in which case the container may follow the natural curve of the architectural element in the photograph.
- **Dividers:** Use ultra-thin (1px) lines in `soft-border` color to separate content without creating visual weight.

## Components

### Buttons
- **Primary:** Solid `brand-vibrancy` with white text. Sharp corners.
- **Secondary:** Transparent background with a 1px `primary` border. 
- **Interaction:** On hover, primary buttons should slightly shift in hue, while secondary buttons should fill with a subtle `secondary` tint.

### Cards
- **Architectural Cards:** Used for portfolio items. These should have no borders or shadows. The image should take up 100% of the card width, with the title and category in `label-caps` placed immediately below with generous padding.

### Input Fields
- **Style:** "Ghost" style. No background, only a bottom border of 1px in `primary`. Labels should use `label-caps` positioned above the line.

### Lists & Features
- Use the `brand-vibrancy` magenta for custom bullet points (small 4x4px squares) to add a clinical, architectural detail to technical descriptions.

### Image Gallery
- Images should use a "Masonry" or "Asymmetric Grid" to reflect the unique shapes of ceiling installations. Every image must have a subtle 1px inner stroke in `luminary-white` at 10% opacity to "lift" the lighting in the photo.