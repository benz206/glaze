"use client";

import { forwardRef } from "react";
import { useSnippetStore } from "@/lib/store";
import { NOISE_TEXTURE, resolveBackground } from "@/lib/backgrounds";
import { WindowFrame } from "./WindowFrame";

/**
 * The capture target for exports. Paints the background, pads around the
 * window, and hugs its content (width: fit-content) so PNGs crop tightly.
 */
export const SnippetCanvas = forwardRef<HTMLDivElement>(function SnippetCanvas(
  _props,
  ref,
) {
  const background = useSnippetStore((s) => s.background);
  const padding = useSnippetStore((s) => s.backgroundPadding);
  const { style } = resolveBackground(background);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ ...style, padding, width: "fit-content" }}
    >
      {background.noise && background.type !== "none" && (
        <div className="glaze-noise" style={{ backgroundImage: NOISE_TEXTURE }} />
      )}
      <div className="relative z-10">
        <WindowFrame />
      </div>
    </div>
  );
});
