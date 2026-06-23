"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { PresetSection } from "./PresetSection";
import { CodeSection } from "./CodeSection";
import { WindowSection } from "./WindowSection";
import { ControlsSection } from "./ControlsSection";
import { CopyButtonSection } from "./CopyButtonSection";
import { BackgroundSection } from "./BackgroundSection";

const MIN_W = 288;
const MAX_W = 560;
const DEFAULT_W = 320;

const clamp = (w: number) => Math.min(MAX_W, Math.max(MIN_W, w));

export function ControlPanel() {
  const [width, setWidth] = useState(DEFAULT_W);
  const [dragging, setDragging] = useState(false);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const startX = e.clientX;
      const startW = width;
      setDragging(true);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";

      const onMove = (ev: PointerEvent) => {
        // Handle lives on the panel's left edge: dragging left widens it.
        setWidth(clamp(startW + (startX - ev.clientX)));
      };
      const onUp = () => {
        setDragging(false);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [width],
  );

  return (
    <aside
      style={{ width }}
      className="glaze-animate-in relative flex shrink-0 [animation-delay:120ms]"
    >
      {/* Drag handle straddling the left border. */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={() => setWidth(DEFAULT_W)}
        title="Drag to resize · double-click to reset"
        className="group absolute inset-y-0 left-0 z-20 w-2 -translate-x-1/2 cursor-col-resize"
      >
        <div
          className={cn(
            "mx-auto h-full w-px transition-colors",
            dragging ? "bg-accent" : "bg-transparent group-hover:bg-accent/60",
          )}
        />
      </div>

      <div className="glaze-scroll h-full flex-1 overflow-y-auto border-l border-border bg-panel">
        <PresetSection />
        <CodeSection />
        <WindowSection />
        <ControlsSection />
        <CopyButtonSection />
        <BackgroundSection />
      </div>
    </aside>
  );
}
