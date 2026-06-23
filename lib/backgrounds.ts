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
  { id: "obsidian", label: "Obsidian", css: "#08080a" },
  { id: "midnight", label: "Midnight", css: "#0a0e1a" },
  { id: "navy", label: "Navy", css: "#0d1b3e" },
  { id: "espresso", label: "Espresso", css: "#1f1410" },
  { id: "wine", label: "Wine", css: "#2b0d18" },
  { id: "pine", label: "Pine", css: "#0c1f1c" },
  { id: "eggplant", label: "Eggplant", css: "#1d1228" },
  { id: "steel", label: "Steel", css: "#1a2026" },
  { id: "charcoal", label: "Charcoal", css: "#171717" },
  { id: "rust", label: "Rust", css: "#2a1208" },
  { id: "mocha", label: "Mocha", css: "#efe7dd" },
  { id: "fog", label: "Fog", css: "#dde3ea" },
  { id: "mint-cream", label: "Mint Cream", css: "#e3f1ea" },
  { id: "blush", label: "Blush", css: "#f6e3e8" },
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
  { id: "oceanic", label: "Oceanic", css: "linear-gradient(135deg, #2e3192 0%, #1bffff 100%)" },
  { id: "fuchsia", label: "Fuchsia", css: "linear-gradient(135deg, #ec008c 0%, #fc6767 100%)" },
  { id: "lime", label: "Lime", css: "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)" },
  { id: "coral", label: "Coral", css: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)" },
  { id: "royal", label: "Royal", css: "linear-gradient(135deg, #141e30 0%, #243b55 100%)" },
  { id: "neon", label: "Neon", css: "linear-gradient(135deg, #00f260 0%, #0575e6 100%)" },
  { id: "rosewater", label: "Rosewater", css: "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)" },
  { id: "emerald", label: "Emerald", css: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)" },
  { id: "tangerine", label: "Tangerine", css: "linear-gradient(135deg, #ff512f 0%, #f09819 100%)" },
  { id: "indigo", label: "Indigo", css: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)" },
  { id: "midnight-city", label: "Midnight City", css: "linear-gradient(135deg, #232526 0%, #414345 100%)" },
  { id: "plasma", label: "Plasma", css: "linear-gradient(135deg, #7303c0 0%, #ec38bc 50%, #fdeff9 100%)" },
  { id: "deep-sea", label: "Deep Sea", css: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)" },
  { id: "lavender", label: "Lavender", css: "linear-gradient(135deg, #b993d6 0%, #8ca6db 100%)" },
  { id: "sunrise", label: "Sunrise", css: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)" },
  { id: "gold", label: "Gold", css: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" },
  { id: "ice", label: "Ice", css: "linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%)" },
  { id: "berry", label: "Berry", css: "linear-gradient(135deg, #872ca0 0%, #f64f59 100%)" },
  { id: "halo", label: "Halo", css: "conic-gradient(from 90deg at 50% 50%, #5b86e5, #36d1dc, #5b86e5)" },
  { id: "spectrum", label: "Spectrum", css: "conic-gradient(from 0deg at 50% 50%, #ff5f6d, #ffc371, #38f9d7, #5b86e5, #c471f5, #ff5f6d)" },
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
  {
    id: "aurora-borealis",
    label: "Aurora Borealis",
    css:
      "radial-gradient(at 10% 10%, #00ffa3 0px, transparent 45%)," +
      "radial-gradient(at 70% 20%, #03a9f4 0px, transparent 45%)," +
      "radial-gradient(at 40% 80%, #7b2ff7 0px, transparent 50%)," +
      "linear-gradient(135deg, #021416, #03101c)",
  },
  {
    id: "deep-space",
    label: "Deep Space",
    css:
      "radial-gradient(at 25% 18%, #3a1c71 0px, transparent 45%)," +
      "radial-gradient(at 78% 30%, #d76d77 0px, transparent 40%)," +
      "radial-gradient(at 55% 88%, #1f2a63 0px, transparent 50%)," +
      "linear-gradient(135deg, #05060f, #02030a)",
  },
  {
    id: "ultraviolet",
    label: "Ultraviolet",
    css:
      "radial-gradient(at 18% 20%, #b721ff 0px, transparent 45%)," +
      "radial-gradient(at 82% 16%, #21d4fd 0px, transparent 45%)," +
      "radial-gradient(at 50% 92%, #6a11cb 0px, transparent 50%)," +
      "linear-gradient(135deg, #120524, #08021a)",
  },
  {
    id: "sunset-haze",
    label: "Sunset Haze",
    css:
      "radial-gradient(at 15% 25%, #ff6a88 0px, transparent 45%)," +
      "radial-gradient(at 85% 15%, #ff99ac 0px, transparent 45%)," +
      "radial-gradient(at 55% 95%, #ffb347 0px, transparent 50%)," +
      "linear-gradient(135deg, #2a0d24, #1a0716)",
  },
  {
    id: "mint-fizz",
    label: "Mint Fizz",
    css:
      "radial-gradient(at 20% 18%, #43e97b 0px, transparent 45%)," +
      "radial-gradient(at 80% 22%, #38f9d7 0px, transparent 45%)," +
      "radial-gradient(at 50% 88%, #a8ff78 0px, transparent 50%)," +
      "linear-gradient(135deg, #04201a, #021410)",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    css:
      "radial-gradient(at 14% 16%, #ff007a 0px, transparent 42%)," +
      "radial-gradient(at 86% 18%, #00e5ff 0px, transparent 42%)," +
      "radial-gradient(at 50% 92%, #fee600 0px, transparent 48%)," +
      "linear-gradient(135deg, #11021a, #060010)",
  },
  {
    id: "golden-hour",
    label: "Golden Hour",
    css:
      "radial-gradient(at 18% 22%, #ffd76f 0px, transparent 45%)," +
      "radial-gradient(at 82% 18%, #ff8c42 0px, transparent 45%)," +
      "radial-gradient(at 50% 90%, #c9485b 0px, transparent 50%)," +
      "linear-gradient(135deg, #1f0f08, #140805)",
  },
  {
    id: "oceanic-mesh",
    label: "Oceanic",
    css:
      "radial-gradient(at 16% 18%, #2af598 0px, transparent 45%)," +
      "radial-gradient(at 84% 22%, #009efd 0px, transparent 45%)," +
      "radial-gradient(at 50% 90%, #2e3192 0px, transparent 50%)," +
      "linear-gradient(135deg, #041326, #020a18)",
  },
  {
    id: "forest-mist",
    label: "Forest Mist",
    css:
      "radial-gradient(at 22% 16%, #56ab2f 0px, transparent 45%)," +
      "radial-gradient(at 78% 24%, #a8e063 0px, transparent 45%)," +
      "radial-gradient(at 50% 88%, #134e5e 0px, transparent 50%)," +
      "linear-gradient(135deg, #08160f, #04100b)",
  },
  {
    id: "candy-cloud",
    label: "Candy Cloud",
    css:
      "radial-gradient(at 20% 20%, #ffb6e6 0px, transparent 50%)," +
      "radial-gradient(at 80% 14%, #c2b6ff 0px, transparent 50%)," +
      "radial-gradient(at 55% 82%, #b6f0ff 0px, transparent 50%)," +
      "linear-gradient(135deg, #fff0fb, #f3f0ff)",
  },
  {
    id: "peachy",
    label: "Peachy",
    css:
      "radial-gradient(at 18% 22%, #ffd3a5 0px, transparent 50%)," +
      "radial-gradient(at 82% 16%, #fd6585 0px, transparent 45%)," +
      "radial-gradient(at 52% 88%, #ffe7c7 0px, transparent 50%)," +
      "linear-gradient(135deg, #fff4ee, #ffe9ec)",
  },
  {
    id: "ember-glow",
    label: "Ember Glow",
    css:
      "radial-gradient(at 16% 20%, #ff4e00 0px, transparent 42%)," +
      "radial-gradient(at 84% 18%, #ec9f05 0px, transparent 42%)," +
      "radial-gradient(at 50% 92%, #8a1a05 0px, transparent 50%)," +
      "linear-gradient(135deg, #170603, #0d0302)",
  },
  {
    id: "twilight-mesh",
    label: "Twilight",
    css:
      "radial-gradient(at 20% 18%, #6a3093 0px, transparent 45%)," +
      "radial-gradient(at 80% 24%, #a044ff 0px, transparent 45%)," +
      "radial-gradient(at 50% 90%, #203a43 0px, transparent 50%)," +
      "linear-gradient(135deg, #0c0a1d, #060512)",
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
