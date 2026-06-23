// Shared types for the Glaze snippet studio.

export type ShadowPreset = "none" | "sm" | "md" | "lg" | "xl" | "glow";

export type TrafficLightStyle = "mac" | "mono" | "custom";

export type CopyButtonMode = "icon" | "text";
export type CopyButtonVariant = "ghost" | "solid" | "outline";

export type BackgroundType = "solid" | "gradient" | "mesh" | "image" | "none";

export interface BackgroundState {
  type: BackgroundType;
  /** Preset id for the active gradient / mesh / solid swatch. */
  preset: string;
  /** Custom solid color (used when type === "solid" and preset === "custom"). */
  solidColor: string;
  /** Custom linear-gradient controls. */
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  /** Remote/data URL for an image background. */
  imageUrl: string;
  /** Subtle film-grain overlay. */
  noise: boolean;
}

export interface TrafficLightColors {
  close: string;
  minimize: string;
  maximize: string;
}

export interface SnippetSettings {
  // --- Code ---
  code: string;
  language: string;
  theme: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  showLineNumbers: boolean;
  wrap: boolean;

  // --- Window ---
  windowWidth: number;
  windowRadius: number;
  windowOpacity: number; // 0–100, alpha of the window background
  windowPadding: number;
  shadow: ShadowPreset;
  showWindowBorder: boolean;

  // Window chrome
  showTrafficLights: boolean;
  trafficLightStyle: TrafficLightStyle;
  trafficLightColors: TrafficLightColors;
  showTitle: boolean;
  title: string;

  // --- Copy button ---
  showCopyButton: boolean;
  copyButtonMode: CopyButtonMode;
  copyButtonText: string;
  copyButtonIcon: string;
  copyButtonVariant: CopyButtonVariant;
  copyButtonColor: string;
  copyButtonRadius: number;

  // --- Background / canvas ---
  background: BackgroundState;
  backgroundPadding: number;
}
