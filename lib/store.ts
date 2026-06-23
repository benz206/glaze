// Global snippet-studio state (Zustand). Fully client-side; no persistence
// beyond the session unless we add it later.

import { create } from "zustand";
import type { BackgroundState, SnippetSettings } from "./types";

const DEFAULT_CODE = `// Glaze — beautiful code snippets, all in the browser.
import { motion } from "motion/react";

export function Sparkle({ count = 12 }: { count?: number }) {
  const points = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid place-items-center">
      {points.map((p) => (
        <motion.span
          key={p}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, delay: p * 0.1, repeat: Infinity }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}`;

const DEFAULT_BACKGROUND: BackgroundState = {
  type: "mesh",
  preset: "nebula",
  solidColor: "#0f172a",
  gradientFrom: "#6a11cb",
  gradientTo: "#2575fc",
  gradientAngle: 135,
  imageUrl: "",
  noise: false,
};

export const DEFAULT_SETTINGS: SnippetSettings = {
  code: DEFAULT_CODE,
  language: "tsx",
  theme: "github-dark",
  fontFamily: "jetbrains-mono",
  fontSize: 14,
  lineHeight: 1.6,
  showLineNumbers: false,
  wrap: true,

  windowWidth: 620,
  windowRadius: 14,
  windowOpacity: 92,
  windowPadding: 20,
  shadow: "xl",
  showWindowBorder: true,

  showTrafficLights: true,
  trafficLightStyle: "mac",
  trafficLightColors: {
    close: "#ff5f57",
    minimize: "#febc2e",
    maximize: "#28c840",
  },
  showTitle: true,
  title: "Sparkle.tsx",

  showCopyButton: true,
  copyButtonMode: "icon",
  copyButtonText: "Copy",
  copyButtonIcon: "copy",
  copyButtonVariant: "ghost",
  copyButtonColor: "#ffffff",
  copyButtonRadius: 8,

  background: DEFAULT_BACKGROUND,
  backgroundPadding: 64,
};

/**
 * Snapshot the current *appearance* as a preset patch — everything a style
 * preset controls (theme, font, window chrome, copy button, background), but
 * never the user's content (code, language, title text, canvas width).
 */
export function pickLook(s: SnippetSettings): Partial<SnippetSettings> {
  return {
    theme: s.theme,
    fontFamily: s.fontFamily,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    showLineNumbers: s.showLineNumbers,
    wrap: s.wrap,
    windowRadius: s.windowRadius,
    windowOpacity: s.windowOpacity,
    windowPadding: s.windowPadding,
    shadow: s.shadow,
    showWindowBorder: s.showWindowBorder,
    showTrafficLights: s.showTrafficLights,
    trafficLightStyle: s.trafficLightStyle,
    trafficLightColors: { ...s.trafficLightColors },
    showTitle: s.showTitle,
    showCopyButton: s.showCopyButton,
    copyButtonMode: s.copyButtonMode,
    copyButtonText: s.copyButtonText,
    copyButtonIcon: s.copyButtonIcon,
    copyButtonVariant: s.copyButtonVariant,
    copyButtonColor: s.copyButtonColor,
    copyButtonRadius: s.copyButtonRadius,
    background: { ...s.background },
    backgroundPadding: s.backgroundPadding,
  };
}

interface SnippetStore extends SnippetSettings {
  /** Patch any top-level setting. */
  set: <K extends keyof SnippetSettings>(key: K, value: SnippetSettings[K]) => void;
  /** Patch nested background state. */
  setBackground: (patch: Partial<BackgroundState>) => void;
  /** Patch one of the three traffic-light colors. */
  setTrafficLightColor: (which: keyof SnippetSettings["trafficLightColors"], color: string) => void;
  /** Apply a premade style preset (look only; leaves code/language/title). */
  applyPreset: (patch: Partial<SnippetSettings>) => void;
  /** Restore every setting to its default. */
  reset: () => void;
}

export const useSnippetStore = create<SnippetStore>((set) => ({
  ...DEFAULT_SETTINGS,

  set: (key, value) => set({ [key]: value } as Pick<SnippetSettings, typeof key>),

  setBackground: (patch) =>
    set((state) => ({ background: { ...state.background, ...patch } })),

  setTrafficLightColor: (which, color) =>
    set((state) => ({
      trafficLightColors: { ...state.trafficLightColors, [which]: color },
    })),

  applyPreset: (patch) => set((state) => ({ ...state, ...patch })),

  reset: () => set({ ...DEFAULT_SETTINGS }),
}));
