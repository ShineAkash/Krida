# Krida — A Motion Graphics Showcase

> A landing page built with one goal in mind: **pushing GSAP to its limits** and proving control over scroll-driven, timeline-based, and interaction-driven motion on the web.

Krida is a fictional gaming/gateway brand site — but the real product here is the **animation system**. Every section is a deliberate study in a different GSAP technique: pinned scroll, clip-path reveals, letter-by-letter 3D staggers, scroll-triggered parallax, hover tilts, and a custom cursor trail. No animation library, no Lottie files — just raw GSAP, ScrollTrigger, and carefully tuned easing curves.

## Live Demo

**[krida-three.vercel.app](https://krida-three.vercel.app)**

## What's Inside

| Section | GSAP Technique |
|---|---|
| **Hero** | Timeline-based video frame swap + scroll-pinned entrance |
| **Navbar** | Reactive hide/show on scroll direction (manual state-driven) |
| **About** | Clip-path mask reveal with `useGSAP` + ScrollTrigger |
| **Features (Bento)** | 3D mouse-tilt on hover, magnet hover effects |
| **Story** | Animated SVG filter, scroll-driven 3D image translation |
| **Footer** | Letter-by-letter 3D rotation stagger, clip-path frame reveal |
| **Custom Cursor** | Two-layer lerp-based dot + ring with hover/click states |

## Motion Techniques Used

- **`useGSAP` hook** for scoped, declarative timelines
- **`ScrollTrigger`** with `scrub`, `pin`, `toggleActions` for scroll-driven motion
- **Clip-path morphing** for cinematic reveals (`polygon` keyframes)
- **3D transforms** with `perspective`, `rotateX/Y`, `rotateZ` for depth
- **Letter staggers** on massive wordmarks with transform-origin pivoting
- **Mouse-tracking 3D tilts** on bento tiles
- **Bouncy easings** (`back.out`, `elastic.out`) vs. cinematic eases (`power3.inOut`)
- **Custom cursor** with rAF-based lerp trailing — no library

## Tech Stack

- **React 18** + **Vite 6** (fast HMR, modern build)
- **GSAP 3** + **ScrollTrigger** — the heart of every animation
- **Tailwind CSS** — utility-first styling, used for layout/chrome only
- **react-use** — `useWindowScroll` for the navbar behavior
- **react-icons** — lightweight icon set

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
src/
├── component/
│   ├── About.jsx          # Clip-path reveal + scroll-triggered subtitle
│   ├── AnimatedTitle.jsx  # Reusable letter-stagger title component
│   ├── Button.jsx         # Hover-magnetic button primitive
│   ├── Cursor.jsx         # Custom rAF-based dot + ring cursor
│   ├── Features.jsx       # Bento grid with 3D mouse-tilt tiles
│   ├── Footer.jsx         # Letter-stagger wordmark + clip-path frame
│   ├── Hero.jsx           # Pinned video timeline
│   ├── Navbar.jsx         # Scroll-direction reactive nav
│   └── Story.jsx          # SVG filter + 3D image translation
├── App.jsx                # Composition root
├── index.css              # Global styles + cursor + Tailwind layers
└── main.jsx               # React entry
```

## Author

Built by **Akash Yadav** as a portfolio piece to demonstrate production-grade motion design with GSAP.
