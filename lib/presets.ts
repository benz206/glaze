// Premade "styles" — curated bundles of look settings a user can apply in one
// click from the panel gallery or studio modal. A preset only sets *appearance*
// (theme, font, window, chrome, background); it never touches the user's code,
// language, or title.
//
// Presets are authored as compact PresetSpec objects (see presetData.ts for the
// big generated batch). The preset() factory expands a spec into full settings
// and DERIVES the thumbnail preview from real per-theme colors (themeColors.ts),
// so we never hand-author preview swatches that drift from the actual theme.

import type {
  BackgroundState,
  BackgroundType,
  ShadowPreset,
  SnippetSettings,
  TrafficLightStyle,
} from "./types";
import { THEME_COLORS } from "./themeColors";
import { GENERATED_SPECS } from "./presetData";

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

/** Compact, authorable description of a preset's look. */
export interface PresetSpec {
  id: string;
  name: string;
  theme: string;
  font: string;
  bgType: BackgroundType;
  /** A valid background-preset id for bgType; "none" when bgType === "none". */
  bgPreset: string;
  shadow?: ShadowPreset;
  radius?: number;
  /** Window background alpha, 0–100. */
  opacity?: number;
  /** Window inner padding (px). */
  padding?: number;
  /** Breathing room between the window and the canvas edge (px). */
  inset?: number;
  border?: boolean;
  lights?: boolean;
  lightStyle?: TrafficLightStyle;
  title?: boolean;
}

export const MAC_DOTS: [string, string, string] = ["#ff5f57", "#febc2e", "#28c840"];
export const MONO_DOTS: [string, string, string] = ["#414148", "#414148", "#414148"];

const FALLBACK_BARS = ["#c792ea", "#82aaff", "#a3be8c", "#ffcb6b"];

function bg(type: BackgroundType, preset: string): BackgroundState {
  return {
    type,
    preset,
    solidColor: "#0f172a",
    gradientFrom: "#9b5de5",
    gradientTo: "#4361ee",
    gradientAngle: 135,
    imageUrl: "",
    noise: false,
  };
}

/** Derive the thumbnail preview from a spec's theme + chrome choices. */
function derivePreview(spec: PresetSpec): PresetPreview {
  const tc = THEME_COLORS[spec.theme];
  const dots: PresetPreview["dots"] =
    spec.lights === false ? "none" : spec.lightStyle === "mono" ? "mono" : "mac";
  return {
    windowBg: tc?.bg ?? "#1e1e1e",
    dots,
    bars: tc?.bars ?? FALLBACK_BARS,
  };
}

/** Derive a thumbnail preview from a stored settings snapshot (custom presets). */
export function previewFromSettings(s: Partial<SnippetSettings>): PresetPreview {
  const tc = s.theme ? THEME_COLORS[s.theme] : undefined;
  const dots: PresetPreview["dots"] =
    s.showTrafficLights === false ? "none" : s.trafficLightStyle === "mono" ? "mono" : "mac";
  return {
    windowBg: tc?.bg ?? "#1e1e1e",
    dots,
    bars: tc?.bars ?? FALLBACK_BARS,
  };
}

/** Expand a compact spec into a full StylePreset with derived preview. */
export function preset(spec: PresetSpec): StylePreset {
  const settings: Partial<SnippetSettings> = {
    theme: spec.theme,
    fontFamily: spec.font,
    windowRadius: spec.radius ?? 14,
    windowOpacity: spec.opacity ?? 100,
    windowPadding: spec.padding ?? 20,
    shadow: spec.shadow ?? "xl",
    showWindowBorder: spec.border ?? true,
    showTrafficLights: spec.lights ?? true,
    trafficLightStyle: spec.lightStyle ?? "mac",
    showTitle: spec.title ?? true,
    background: bg(spec.bgType, spec.bgType === "none" ? "none" : spec.bgPreset),
    backgroundPadding: spec.inset ?? 64,
  };
  return { id: spec.id, name: spec.name, settings, preview: derivePreview(spec) };
}

// Hand-curated "core" presets, shown first. The larger generated set follows.
const CURATED: PresetSpec[] = [
  { id: "nebula-glow", name: "Nebula Glow", theme: "github-dark", font: "jetbrains-mono", bgType: "mesh", bgPreset: "nebula", shadow: "glow", radius: 16, opacity: 92, inset: 72 },
  { id: "sunset-pop", name: "Sunset Pop", theme: "one-dark-pro", font: "geist-mono", bgType: "gradient", bgPreset: "sunset", shadow: "xl", radius: 16, opacity: 95 },
  { id: "mono-noir", name: "Mono Noir", theme: "vesper", font: "jetbrains-mono", bgType: "solid", bgPreset: "ink", shadow: "lg", radius: 12, padding: 22, inset: 80, border: false, lightStyle: "mono", title: false },
  { id: "vaporwave", name: "Vaporwave", theme: "synthwave-84", font: "fira-code", bgType: "gradient", bgPreset: "cosmic", shadow: "glow", radius: 14 },
  { id: "dracula-dream", name: "Dracula Dream", theme: "dracula", font: "jetbrains-mono", bgType: "gradient", bgPreset: "grape", shadow: "xl", radius: 14 },
  { id: "tokyo-midnight", name: "Tokyo Midnight", theme: "tokyo-night", font: "jetbrains-mono", bgType: "gradient", bgPreset: "twilight", shadow: "lg", radius: 12, opacity: 96 },
  { id: "rose-bloom", name: "Rosé Bloom", theme: "rose-pine", font: "ibm-plex-mono", bgType: "mesh", bgPreset: "blossom", shadow: "lg", radius: 16 },
  { id: "ocean-deep", name: "Ocean Deep", theme: "night-owl", font: "jetbrains-mono", bgType: "mesh", bgPreset: "lagoon", shadow: "xl", radius: 14 },
  { id: "aurora", name: "Aurora", theme: "nord", font: "geist-mono", bgType: "gradient", bgPreset: "aurora", shadow: "lg", radius: 14 },
  { id: "magma", name: "Magma", theme: "monokai", font: "fira-code", bgType: "mesh", bgPreset: "magma", shadow: "glow", radius: 12 },
  { id: "frost", name: "Frost", theme: "material-theme-ocean", font: "jetbrains-mono", bgType: "mesh", bgPreset: "frost", shadow: "lg", radius: 16 },
  { id: "candy", name: "Candy", theme: "catppuccin-mocha", font: "jetbrains-mono", bgType: "gradient", bgPreset: "candy", shadow: "xl", radius: 18, opacity: 94 },
  { id: "terminal", name: "Terminal", theme: "github-dark", font: "source-code-pro", bgType: "solid", bgPreset: "graphite", shadow: "md", radius: 8, inset: 56, lightStyle: "mono", title: false },
  { id: "clean-light", name: "Clean Light", theme: "github-light", font: "jetbrains-mono", bgType: "solid", bgPreset: "cloud", shadow: "md", radius: 14 },
  { id: "paper", name: "Paper", theme: "one-light", font: "ibm-plex-mono", bgType: "solid", bgPreset: "sand", shadow: "sm", radius: 12, lightStyle: "mono" },
  { id: "minimal", name: "Minimal", theme: "vitesse-dark", font: "geist-mono", bgType: "none", bgPreset: "none", shadow: "glow", radius: 14, inset: 48 },
];

export const PRESET_SPECS: PresetSpec[] = [...CURATED, ...GENERATED_SPECS];

export const PRESETS: StylePreset[] = PRESET_SPECS.map(preset);

export function presetById(id: string): StylePreset | undefined {
  return PRESETS.find((p) => p.id === id);
}
