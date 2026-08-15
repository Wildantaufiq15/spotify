---
name: Sonic Nuptials
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbcbb8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#859583'
  outline-variant: '#3c4a3c'
  surface-tint: '#34e36a'
  primary: '#4cf479'
  on-primary: '#003913'
  primary-container: '#1ed760'
  on-primary-container: '#005721'
  inverse-primary: '#006e2c'
  secondary: '#c7c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#d9d7d6'
  on-tertiary: '#313030'
  tertiary-container: '#bdbbba'
  on-tertiary-container: '#4b4b4b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#69ff89'
  primary-fixed-dim: '#34e36a'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531f'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  spotify-green-dark: '#1DB954'
  pure-white: '#FFFFFF'
  gradient-male-start: '#7A2E6E'
  gradient-male-end: '#3D1533'
  gradient-female-start: '#1B3A5C'
  gradient-female-end: '#0F1F33'
  track-amber-start: '#FF8F00'
  track-amber-end: '#BF360C'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.3'
  body-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.15em
  countdown-num:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.1'
  player-track:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 20px
  section-gap: 48px
  card-padding: 24px
  gutter: 16px
---

## Brand & Style

The design system is a "Streaming-First" digital experience that reimagines the wedding invitation as a premium music application. The brand personality is modern, immersive, and sleek, leveraging the familiar interface patterns of global music streaming platforms to create a high-engagement user journey.

The aesthetic is rooted in **Modern Minimalism** with heavy influences of **Glassmorphism** and **Duotone** imagery. The interface relies on a deep, "near-black" canvas to allow the vibrant primary accent to pop. Visual depth is achieved through translucent layers and subtle blurs rather than traditional shadows, ensuring the content feels like it is floating within a high-end digital ecosystem. The emotional response should be one of "exclusive access"—as if the guest is being invited to a private, premium playlist release.

## Colors

The palette is strictly dark-mode centric. The **Primary Color** (#1ED760) is reserved for high-action touchpoints like play buttons, progress bars, and active states.

- **Backgrounds:** Use the near-black (#121212) for the base canvas and the tertiary grey (#1A1A1A) for surface elevations like the "Mini Player Bar."
- **Typography:** Headlines and primary labels use Pure White (#FFFFFF). Secondary descriptions and metadata use the desaturated Secondary grey (#B3B3B3) to establish hierarchy.
- **Dynamic Gradients:** The system uses specific gradients to differentiate profiles (Purple/Magenta for the Groom and Navy/Blue for the Bride) and storytelling chapters.
- **Duotone Effect:** All event-related photography should be treated with a high-contrast duotone filter, mapping shadows to near-black and highlights to a deep emerald/teal to maintain the "Spotify Wrapped" aesthetic.

## Typography

The typography utilizes **Montserrat** across all levels to emulate the clean, geometric vibe of modern tech interfaces. 

- **Hierarchy:** Use `headline-xl` for the names of the couple and section headers. 
- **Metadata Style:** The `label-caps` style is critical for the "Spotify" look; use it for small category tags (e.g., "TRACK 1", "ON THE SPECIAL PLAYLIST").
- **Readability:** Body text is kept at a comfortable 14px with generous line height (1.6) to ensure the romantic narrative remains legible against the dark background.
- **Spacing:** Letter spacing should be tightened for large headlines (-0.02em) and significantly expanded for labels (+0.15em) to create a premium, editorial feel.

## Layout & Spacing

This is a **Mobile-First** system designed for a portrait viewport (~390px width). 

- **Grid Model:** A single-column vertical flow. Content is housed within a main container with 20px side margins.
- **Rhythm:** Sections are separated by "Mini Player Bar" dividers or significant vertical whitespace (48px+) to prevent the dark UI from feeling cramped.
- **Alignment:** Most text content is centered to evoke a ceremonial feel, though "Track List" cards (Story section) utilize asymmetrical layouts with text right-aligned against tilted imagery.
- **Fixed Elements:** The "Now Playing" mini-bar and the floating audio toggle should utilize fixed positioning to remain accessible during the scroll.

## Elevation & Depth

Visual hierarchy is communicated through **Tonal Layering** and **Glassmorphism**:

1.  **Level 0 (Base):** The #121212 background.
2.  **Level 1 (Surfaces):** Cards and bars use #1A1A1A.
3.  **Level 2 (Interactive):** Glassmorphic effects are applied to the "Mini Player Bar" and "Confirm Attendance" cards using a subtle background blur (8px to 12px) and a low-opacity white border (10%).
4.  **Shadows:** Avoid heavy black shadows. Instead, use a subtle **Green Glow** (Primary color at 20% opacity) for active buttons and the countdown timer to simulate a digital "lit" effect.
5.  **Duotone Depth:** High-contrast images serve as structural anchors, creating visual "weight" in the scroll without needing borders.

## Shapes

The design system uses a **high-radius** shape language to feel approachable and modern.

- **Standard Cards:** Use a 24px corner radius (`rounded-xl` / `rounded-2xl` equivalents) to create the soft "app-like" container style.
- **Buttons:** All primary and secondary CTA buttons must be **Pill-Shaped** (fully rounded ends).
- **Profile Imagery:** Artist-style profile photos must be perfectly **Circular**.
- **Gallery Grid:** Smaller 16px radius for the photo grid to maximize the "tile" effect.
- **Album Art:** Story section images should appear as slightly tilted squares with 8px radius corners to mimic physical media/Polaroids.

## Components

### Pill Buttons
- **Solid Style:** Background in Primary Green, text in Near-Black. Used for the final "Confirm Attendance" CTA.
- **Outline Style:** 1px Green border, white text, 8px horizontal padding. Includes a small play icon (SVG) to the left of the text.

### Mini Player Bar (Section Divider)
- A full-width horizontal bar with a 12px backdrop-blur. 
- Contains a 32px rounded square thumbnail on the left, "Song Title" (Couple Names) in the center, and transport icons (Add, Skip, Expand) on the right.

### Music Player Widget
- **Progress Bar:** A 4px thick track (Tertiary color) with a green fill indicating "progress" and a small white circular handle.
- **Controls:** A large white Play circle with a black icon, flanked by Shuffle, Previous, Next, and Repeat icons in white.

### Track Cards (Love Story)
- Asymmetrical layout: A "tilted" album cover image on the left (rotated 3-5 degrees) with a drop shadow, and right-aligned text on the right. Each card uses a unique vibrant-to-dark gradient background.

### Artist Profile Cards
- Large gradient surfaces containing a centered circular photo with a subtle outer glow. The handle (e.g., @username) is placed above the bold name in a secondary grey label style.

### Input Fields (RSVP)
- Dark grey fills (#1A1A1A) with 12px rounding. Focus states should trigger a 1px Primary Green border.