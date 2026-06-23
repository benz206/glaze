// Premade "styles" — curated bundles of look settings the user can apply in one
// click from the panel gallery or the studio modal. A preset only sets the
// *appearance* (theme, font, window, chrome, background); it never touches the
// user's code, language, or title.

import type {
  BackgroundState,
  BackgroundType,
  SnippetSettings,
  TrafficLightStyle,
} from "./types";

/** Cheap, Shiki-free data used to paint a preset thumbnail. */
export interface PresetPreview {
  /** Approx. window fill for the mock (the theme's editor background). */
  windowBg: string;
  /** Traffic-light treatment in the mock. */
  dots: "mac" | "mono" | "none";
  /** A few representative syntax colors, painted as fake code bars. */
  bars: string[];
}

export interface StylePreset {
  id: string;
  name: string;
  settings: Partial<SnippetSettings>;
  preview: PresetPreview;
}

export const MAC_DOTS: [string, string, string] = ["#ff5f57", "#febc2e", "#28c840"];
export const MONO_DOTS: [string, string, string] = ["#414148", "#414148", "#414148"];

function bg(
  type: BackgroundType,
  preset: string,
  extra: Partial<BackgroundState> = {},
): BackgroundState {
  return {
    type,
    preset,
    solidColor: "#0f172a",
    gradientFrom: "#9b5de5",
    gradientTo: "#4361ee",
    gradientAngle: 135,
    imageUrl: "",
    noise: false,
    ...extra,
  };
}

interface LookArgs {
  theme: string;
  font: string;
  radius?: number;
  opacity?: number;
  padding?: number;
  shadow?: SnippetSettings["shadow"];
  border?: boolean;
  lights?: boolean;
  lightStyle?: TrafficLightStyle;
  title?: boolean;
  background: BackgroundState;
  inset?: number;
}

function look(a: LookArgs): Partial<SnippetSettings> {
  return {
    theme: a.theme,
    fontFamily: a.font,
    windowRadius: a.radius ?? 14,
    windowOpacity: a.opacity ?? 100,
    windowPadding: a.padding ?? 20,
    shadow: a.shadow ?? "xl",
    showWindowBorder: a.border ?? true,
    showTrafficLights: a.lights ?? true,
    trafficLightStyle: a.lightStyle ?? "mac",
    showTitle: a.title ?? true,
    background: a.background,
    backgroundPadding: a.inset ?? 64,
  };
}

export const PRESETS: StylePreset[] = [
  {
    id: "nebula-glow",
    name: "Nebula Glow",
    settings: look({
      theme: "github-dark",
      font: "jetbrains-mono",
      shadow: "glow",
      opacity: 92,
      radius: 16,
      background: bg("mesh", "nebula"),
      inset: 72,
    }),
    preview: { windowBg: "#0d1117", dots: "mac", bars: ["#ff7b72", "#79c0ff", "#a5d6ff", "#d2a8ff"] },
  },
  {
    id: "sunset-pop",
    name: "Sunset Pop",
    settings: look({
      theme: "one-dark-pro",
      font: "geist-mono",
      shadow: "xl",
      opacity: 95,
      radius: 16,
      background: bg("gradient", "sunset"),
    }),
    preview: { windowBg: "#282c34", dots: "mac", bars: ["#c678dd", "#61afef", "#98c379", "#e5c07b"] },
  },
  {
    id: "mono-noir",
    name: "Mono Noir",
    settings: look({
      theme: "vesper",
      font: "jetbrains-mono",
      shadow: "lg",
      radius: 12,
      border: false,
      lightStyle: "mono",
      title: false,
      padding: 22,
      background: bg("solid", "ink"),
      inset: 80,
    }),
    preview: { windowBg: "#101010", dots: "mono", bars: ["#a0a0a0", "#ffc799", "#99ffe4", "#666666"] },
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    settings: look({
      theme: "synthwave-84",
      font: "fira-code",
      shadow: "glow",
      radius: 14,
      background: bg("gradient", "cosmic"),
    }),
    preview: { windowBg: "#262335", dots: "mac", bars: ["#fede5d", "#ff7edb", "#36f9f6", "#fe4450"] },
  },
  {
    id: "dracula-dream",
    name: "Dracula Dream",
    settings: look({
      theme: "dracula",
      font: "jetbrains-mono",
      shadow: "xl",
      radius: 14,
      background: bg("gradient", "grape"),
    }),
    preview: { windowBg: "#282a36", dots: "mac", bars: ["#ff79c6", "#8be9fd", "#50fa7b", "#bd93f9"] },
  },
  {
    id: "tokyo-midnight",
    name: "Tokyo Midnight",
    settings: look({
      theme: "tokyo-night",
      font: "jetbrains-mono",
      shadow: "lg",
      radius: 12,
      opacity: 96,
      background: bg("gradient", "twilight"),
    }),
    preview: { windowBg: "#1a1b26", dots: "mac", bars: ["#bb9af7", "#7aa2f7", "#9ece6a", "#7dcfff"] },
  },
  {
    id: "rose-bloom",
    name: "Rosé Bloom",
    settings: look({
      theme: "rose-pine",
      font: "ibm-plex-mono",
      shadow: "lg",
      radius: 16,
      background: bg("mesh", "blossom"),
    }),
    preview: { windowBg: "#191724", dots: "mac", bars: ["#c4a7e7", "#9ccfd8", "#ebbcba", "#f6c177"] },
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    settings: look({
      theme: "night-owl",
      font: "jetbrains-mono",
      shadow: "xl",
      radius: 14,
      background: bg("mesh", "lagoon"),
    }),
    preview: { windowBg: "#011627", dots: "mac", bars: ["#c792ea", "#82aaff", "#addb67", "#7fdbca"] },
  },
  {
    id: "aurora",
    name: "Aurora",
    settings: look({
      theme: "nord",
      font: "geist-mono",
      shadow: "lg",
      radius: 14,
      background: bg("gradient", "aurora"),
    }),
    preview: { windowBg: "#2e3440", dots: "mac", bars: ["#81a1c1", "#88c0d0", "#a3be8c", "#ebcb8b"] },
  },
  {
    id: "magma",
    name: "Magma",
    settings: look({
      theme: "monokai",
      font: "fira-code",
      shadow: "glow",
      radius: 12,
      background: bg("mesh", "magma"),
    }),
    preview: { windowBg: "#272822", dots: "mac", bars: ["#f92672", "#a6e22e", "#66d9ef", "#fd971f"] },
  },
  {
    id: "frost",
    name: "Frost",
    settings: look({
      theme: "material-theme-ocean",
      font: "jetbrains-mono",
      shadow: "lg",
      radius: 16,
      background: bg("mesh", "frost"),
    }),
    preview: { windowBg: "#0f111a", dots: "mac", bars: ["#c792ea", "#82aaff", "#c3e88d", "#89ddff"] },
  },
  {
    id: "candy",
    name: "Candy",
    settings: look({
      theme: "catppuccin-mocha",
      font: "jetbrains-mono",
      shadow: "xl",
      radius: 18,
      opacity: 94,
      background: bg("gradient", "candy"),
    }),
    preview: { windowBg: "#1e1e2e", dots: "mac", bars: ["#cba6f7", "#89b4fa", "#a6e3a1", "#f5c2e7"] },
  },
  {
    id: "terminal",
    name: "Terminal",
    settings: look({
      theme: "github-dark",
      font: "source-code-pro",
      shadow: "md",
      radius: 8,
      lightStyle: "mono",
      title: false,
      background: bg("solid", "graphite"),
      inset: 56,
    }),
    preview: { windowBg: "#1c1c1f", dots: "mono", bars: ["#7ee787", "#79c0ff", "#ffa657", "#8b949e"] },
  },
  {
    id: "clean-light",
    name: "Clean Light",
    settings: look({
      theme: "github-light",
      font: "jetbrains-mono",
      shadow: "md",
      radius: 14,
      background: bg("solid", "cloud"),
    }),
    preview: { windowBg: "#ffffff", dots: "mac", bars: ["#cf222e", "#0550ae", "#0a3069", "#6e7781"] },
  },
  {
    id: "paper",
    name: "Paper",
    settings: look({
      theme: "one-light",
      font: "ibm-plex-mono",
      shadow: "sm",
      radius: 12,
      lightStyle: "mono",
      background: bg("solid", "sand"),
    }),
    preview: { windowBg: "#fafafa", dots: "mono", bars: ["#a626a4", "#4078f2", "#50a14f", "#a0a1a7"] },
  },
  {
    id: "minimal",
    name: "Minimal",
    settings: look({
      theme: "vitesse-dark",
      font: "geist-mono",
      shadow: "glow",
      radius: 14,
      background: bg("none", "none"),
      inset: 48,
    }),
    preview: { windowBg: "#121212", dots: "mac", bars: ["#4d9375", "#bd976a", "#cb7676", "#80a665"] },
  },
];

export function presetById(id: string): StylePreset | undefined {
  return PRESETS.find((p) => p.id === id);
}
