// Background presets + a resolver that turns BackgroundState into CSS.

import type { BackgroundState } from "./types";

export interface Preset {
  id: string;
  label: string;
  /** Value for the CSS `background` shorthand. */
  css: string;
}

// Solid swatches.
export const SOLID_SWATCHES: Preset[] = [
  { id: "slate", label: "Slate", css: "#0f172a" },
  { id: "ink", label: "Ink", css: "#111114" },
  { id: "graphite", label: "Graphite", css: "#1c1c1f" },
  { id: "plum", label: "Plum", css: "#2a1a33" },
  { id: "ocean", label: "Ocean", css: "#0b2540" },
  { id: "forest", label: "Forest", css: "#10241b" },
  { id: "sand", label: "Sand", css: "#e7e1d6" },
  { id: "cloud", label: "Cloud", css: "#eef2f7" },
];

// Linear / conic gradient presets.
export const GRADIENT_PRESETS: Preset[] = [
  { id: "sunset", label: "Sunset", css: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)" },
  { id: "candy", label: "Candy", css: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%)" },
  { id: "grape", label: "Grape", css: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" },
  { id: "aurora", label: "Aurora", css: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)" },
  { id: "ember", label: "Ember", css: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)" },
  { id: "twilight", label: "Twilight", css: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" },
  { id: "peach", label: "Peach", css: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
  { id: "violet", label: "Violet", css: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)" },
  { id: "mint", label: "Mint", css: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
  { id: "cosmic", label: "Cosmic", css: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" },
  { id: "flare", label: "Flare", css: "conic-gradient(from 180deg at 50% 50%, #ff5f6d, #ffc371, #ff5f6d)" },
  { id: "dusk", label: "Dusk", css: "linear-gradient(135deg, #355c7d 0%, #6c5b7b 50%, #c06c84 100%)" },
];

// Multi-stop mesh gradients (layered radials over a base color).
export const MESH_PRESETS: Preset[] = [
  {
    id: "nebula",
    label: "Nebula",
    css:
      "radial-gradient(at 18% 22%, #7b2ff7 0px, transparent 50%)," +
      "radial-gradient(at 82% 12%, #f107a3 0px, transparent 50%)," +
      "radial-gradient(at 50% 85%, #2a8af6 0px, transparent 50%)," +
      "linear-gradient(135deg, #11071f, #0a0a18)",
  },
  {
    id: "lagoon",
    label: "Lagoon",
    css:
      "radial-gradient(at 12% 18%, #00d2ff 0px, transparent 45%)," +
      "radial-gradient(at 88% 24%, #3a7bd5 0px, transparent 45%)," +
      "radial-gradient(at 40% 90%, #00e0a1 0px, transparent 50%)," +
      "linear-gradient(135deg, #04243b, #021018)",
  },
  {
    id: "blossom",
    label: "Blossom",
    css:
      "radial-gradient(at 20% 20%, #ff9a9e 0px, transparent 50%)," +
      "radial-gradient(at 80% 10%, #fbc2eb 0px, transparent 50%)," +
      "radial-gradient(at 60% 80%, #a18cd1 0px, transparent 50%)," +
      "linear-gradient(135deg, #fdeff2, #f7e8ff)",
  },
  {
    id: "citrus",
    label: "Citrus",
    css:
      "radial-gradient(at 15% 15%, #f9d423 0px, transparent 45%)," +
      "radial-gradient(at 85% 20%, #ff4e50 0px, transparent 45%)," +
      "radial-gradient(at 50% 95%, #ff8008 0px, transparent 50%)," +
      "linear-gradient(135deg, #2b0a04, #1a0703)",
  },
  {
    id: "frost",
    label: "Frost",
    css:
      "radial-gradient(at 22% 16%, #a1c4fd 0px, transparent 50%)," +
      "radial-gradient(at 78% 18%, #c2e9fb 0px, transparent 50%)," +
      "radial-gradient(at 50% 88%, #d4fc79 0px, transparent 50%)," +
      "linear-gradient(135deg, #0b1622, #0a1018)",
  },
  {
    id: "magma",
    label: "Magma",
    css:
      "radial-gradient(at 18% 24%, #f5515f 0px, transparent 45%)," +
      "radial-gradient(at 80% 16%, #9f041b 0px, transparent 45%)," +
      "radial-gradient(at 55% 90%, #fbb034 0px, transparent 50%)," +
      "linear-gradient(135deg, #1a0606, #100303)",
  },
];

/** Tiling film-grain texture, applied by the canvas as a blended overlay. */
export const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function presetById(id: string): Preset | undefined {
  return [...SOLID_SWATCHES, ...GRADIENT_PRESETS, ...MESH_PRESETS].find((p) => p.id === id);
}

/**
 * Resolve a BackgroundState into a CSS style object for the canvas.
 * `transparent` reports whether the export should keep an alpha channel.
 */
export function resolveBackground(bg: BackgroundState): {
  style: React.CSSProperties;
  transparent: boolean;
} {
  const layers: string[] = [];
  let transparent = false;

  switch (bg.type) {
    case "none":
      transparent = true;
      break;
    case "solid": {
      const base = bg.preset === "custom" ? bg.solidColor : presetById(bg.preset)?.css ?? bg.solidColor;
      layers.push(`linear-gradient(${base}, ${base})`);
      break;
    }
    case "gradient": {
      if (bg.preset === "custom") {
        layers.push(`linear-gradient(${bg.gradientAngle}deg, ${bg.gradientFrom}, ${bg.gradientTo})`);
      } else {
        layers.push(presetById(bg.preset)?.css ?? GRADIENT_PRESETS[0].css);
      }
      break;
    }
    case "mesh":
      layers.push(presetById(bg.preset)?.css ?? MESH_PRESETS[0].css);
      break;
    case "image":
      if (bg.imageUrl) {
        layers.push(`url("${bg.imageUrl}") center / cover no-repeat`);
      } else {
        layers.push("linear-gradient(135deg, #1a1a1f, #0a0a0d)");
      }
      break;
  }

  return {
    style: { background: layers.length ? layers.join(", ") : undefined },
    transparent,
  };
}
