"use client";

import { useState } from "react";
import { useSnippetStore } from "@/lib/store";
import { hexToRgba } from "@/lib/color";
import type { ShadowPreset } from "@/lib/types";
import { CodeEditor, type ThemeColors } from "./CodeEditor";
import { TrafficLights } from "./TrafficLights";
import { CopyButton } from "./CopyButton";

const SHADOWS: Record<ShadowPreset, string> = {
  none: "none",
  sm: "0 2px 8px rgba(0,0,0,0.25)",
  md: "0 10px 28px rgba(0,0,0,0.35)",
  lg: "0 20px 50px rgba(0,0,0,0.45)",
  xl: "0 34px 74px -14px rgba(0,0,0,0.65)",
  glow: "0 0 0 1px rgba(255,255,255,0.04), 0 26px 70px -10px rgba(139,128,249,0.5)",
};

export function WindowFrame() {
  const [colors, setColors] = useState<ThemeColors>({
    bg: "#0d1117",
    fg: "#e6edf3",
  });

  const width = useSnippetStore((s) => s.windowWidth);
  const radius = useSnippetStore((s) => s.windowRadius);
  const opacity = useSnippetStore((s) => s.windowOpacity);
  const padding = useSnippetStore((s) => s.windowPadding);
  const shadow = useSnippetStore((s) => s.shadow);
  const border = useSnippetStore((s) => s.showWindowBorder);
  const showTrafficLights = useSnippetStore((s) => s.showTrafficLights);
  const showTitle = useSnippetStore((s) => s.showTitle);
  const title = useSnippetStore((s) => s.title);

  const background = hexToRgba(colors.bg, opacity / 100);
  const hasHeader = showTrafficLights || showTitle;
  const headerPadV = Math.max(11, Math.round(padding * 0.6));

  return (
    <div className="relative" style={{ width }}>
      <div
        className="overflow-hidden"
        style={{
          borderRadius: radius,
          background,
          boxShadow: SHADOWS[shadow],
          border: border ? "1px solid rgba(255,255,255,0.09)" : "none",
        }}
      >
        {hasHeader && (
          <div
            className="flex items-center gap-3"
            style={{ padding: `${headerPadV}px ${padding}px` }}
          >
            {showTrafficLights && <TrafficLights />}
            {showTitle && (
              <span
                className="flex-1 truncate text-center text-xs font-medium"
                style={{ color: hexToRgba(colors.fg, 0.55) }}
              >
                {title}
              </span>
            )}
            {/* Balance the traffic lights so the title stays centered. */}
            {showTrafficLights && showTitle && <span className="w-[52px] shrink-0" />}
          </div>
        )}

        <div
          style={{
            padding: hasHeader
              ? `0 ${padding}px ${padding}px`
              : `${padding}px`,
          }}
        >
          <CodeEditor onResolve={setColors} />
        </div>
      </div>

      <div className="absolute top-3 right-3">
        <CopyButton />
      </div>
    </div>
  );
}
