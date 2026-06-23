# Glaze

Turn code into gorgeous, shareable images — entirely in your browser. Glaze is a
client-side snippet studio: paste code, pick a theme, dress up the window, drop a
gradient or mesh behind it, and export a crisp PNG/SVG or copy it straight to your
clipboard. No accounts, no server, nothing leaves the page.

![status](https://img.shields.io/badge/render-100%25%20client--side-8b80f9)

## Features

- **Real syntax highlighting** — [Shiki](https://shiki.style) (the same engine as
  VS Code), 30+ themes and 35+ languages, loaded on demand.
- **Live editor** — a transparent textarea sits over the highlighted layer, so you
  type real code and see real colors with a matching caret.
- **Window styling** — width, corner radius, opacity/glass, padding, six shadow
  presets, and a border highlight.
- **The three buttons** — macOS / monochrome / fully custom colors, or remove them
  entirely.
- **Title bar** — optional, editable, auto-centered.
- **Custom copy button** — icon *or* text, six icons, ghost / solid / outline
  variants, custom color and corner radius — or hide it.
- **Backgrounds** — solid swatches, gradient presets + custom angle/stops, layered
  mesh gradients, image URLs, transparent (alpha-preserving), and optional film grain.
- **Export** — PNG or SVG at 1×/2×/3×, or copy the image to the clipboard.
- **Fonts** — JetBrains Mono, Geist Mono, Fira Code, IBM Plex Mono, Source Code Pro,
  plus adjustable size and line height.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) — statically exported, no backend
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Shiki](https://shiki.style) for highlighting
- [Zustand](https://github.com/pmndrs/zustand) for state
- [html-to-image](https://github.com/bubkoo/html-to-image) for export
- [lucide-react](https://lucide.dev) for icons
- [Bun](https://bun.sh) as package manager and runtime

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

Other scripts:

```bash
bun run build    # production build (static)
bun run start    # serve the production build
bun run lint     # eslint
```

## Project layout

```
app/
  layout.tsx              # fonts + metadata
  page.tsx                # studio shell: toolbar · canvas · control panel
  globals.css             # UI theme tokens + code-overlay alignment rules
components/
  Toolbar.tsx             # logo, export scale, PNG/SVG/copy, reset
  editor/
    SnippetCanvas.tsx     # background + padding; the export target (ref)
    WindowFrame.tsx       # window chrome, opacity blend, shadow
    CodeEditor.tsx        # Shiki overlay + transparent textarea
    TrafficLights.tsx     # the three buttons
    CopyButton.tsx        # configurable copy control
  panel/                  # one Section per control group
    ControlPanel.tsx  CodeSection.tsx  WindowSection.tsx
    ControlsSection.tsx  CopyButtonSection.tsx  BackgroundSection.tsx
  ui/                     # Section + small control primitives
lib/
  store.ts                # Zustand store + defaults
  highlighter.ts          # lazy Shiki singleton (on-demand themes/langs)
  themes.ts languages.ts fonts.ts backgrounds.ts icons.ts
  export.ts               # html-to-image helpers
  color.ts cn.ts          # small utilities
```

## How the editor stays aligned

The highlighted code is rendered by Shiki into a `<pre class="shiki">`, and a
transparent `<textarea>` is layered exactly on top. Both share identical font,
size, line-height, tab-size and wrap rules (see `.glaze-code` in `globals.css`),
so the caret and selection line up with the colored glyphs while you edit.

## Notes & limitations

- Highlighting runs in the browser; the very first keystroke after load waits a
  beat for Shiki's WASM to initialize, then it's instant.
- Line numbers assume non-wrapping lines; with **Wrap lines** on, a wrapped line
  can offset the gutter. Turn wrap off for exact gutters.
- Clipboard image copy needs a browser that supports `ClipboardItem` (Chrome,
  Edge, Safari). Downloading PNG/SVG works everywhere.
- `backdrop-filter` glass is shown live but isn't captured by `html-to-image`; the
  translucent fill still exports.

## License

MIT
