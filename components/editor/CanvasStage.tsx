"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Maximize, Minus, Plus } from "lucide-react";
import { useUIStore } from "@/lib/ui";
import { SnippetCanvas } from "./SnippetCanvas";

const DOTTED: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

/**
 * Scrollable workspace that hosts the snippet canvas and a view-zoom. The zoom
 * transform lives on a wrapper *around* `canvasRef`, never the ref node itself,
 * so html-to-image (which measures the ref's own box) exports identically at any
 * zoom. A spacer sized to the scaled footprint keeps scrolling correct.
 */
export function CanvasStage({
  canvasRef,
}: {
  canvasRef: RefObject<HTMLDivElement | null>;
}) {
  const zoom = useUIStore((s) => s.zoom);
  const setZoom = useUIStore((s) => s.setZoom);
  const resetZoom = useUIStore((s) => s.resetZoom);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [nat, setNat] = useState({ w: 0, h: 0 });

  // Track the canvas' natural (unscaled) size; offsetWidth/Height ignore the
  // ancestor transform, so this stays stable while zooming and only changes when
  // the snippet itself changes (width, padding, fonts).
  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const measure = () => setNat({ w: node.offsetWidth, h: node.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [canvasRef]);

  // Ctrl/Cmd + wheel to zoom (needs a non-passive listener to preventDefault).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      setZoom(useUIStore.getState().zoom * factor);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setZoom]);

  const fitToView = useCallback(() => {
    const el = scrollRef.current;
    const node = canvasRef.current;
    if (!el || !node) return;
    const w = node.offsetWidth;
    const h = node.offsetHeight;
    if (w <= 0 || h <= 0) return;
    const avail = Math.min((el.clientWidth - 96) / w, (el.clientHeight - 96) / h);
    setZoom(avail);
  }, [canvasRef, setZoom]);

  const positioned = nat.w > 0;

  return (
    <main className="relative min-h-0 flex-1">
      <div
        ref={scrollRef}
        className="glaze-scroll absolute inset-0 overflow-auto"
        style={DOTTED}
      >
        <div
          className="flex min-h-full p-12"
          style={{ justifyContent: "safe center", alignItems: "safe center" }}
        >
          <div
            style={{
              flexShrink: 0,
              position: "relative",
              width: positioned ? nat.w * zoom : undefined,
              height: positioned ? nat.h * zoom : undefined,
            }}
          >
            <div
              style={{
                position: positioned ? "absolute" : "static",
                top: 0,
                left: 0,
                transformOrigin: "top left",
                transform: `scale(${zoom})`,
              }}
            >
              <SnippetCanvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>

      <ZoomControl
        zoom={zoom}
        onOut={() => setZoom(zoom - (zoom <= 0.5 ? 0.1 : 0.25))}
        onIn={() => setZoom(zoom + (zoom < 0.5 ? 0.1 : 0.25))}
        onReset={resetZoom}
        onFit={fitToView}
      />
    </main>
  );
}

function ZoomControl({
  zoom,
  onOut,
  onIn,
  onReset,
  onFit,
}: {
  zoom: number;
  onOut: () => void;
  onIn: () => void;
  onReset: () => void;
  onFit: () => void;
}) {
  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-xl border border-border bg-panel/90 p-1 shadow-lg backdrop-blur-sm">
      <ZoomBtn label="Zoom out" onClick={onOut}>
        <Minus size={15} />
      </ZoomBtn>
      <button
        type="button"
        onClick={onReset}
        title="Reset to 100%"
        className="min-w-[3.25rem] rounded-md px-2 py-1 text-center text-xs font-medium tabular-nums text-white hover:bg-elevated"
      >
        {Math.round(zoom * 100)}%
      </button>
      <ZoomBtn label="Zoom in" onClick={onIn}>
        <Plus size={15} />
      </ZoomBtn>
      <div className="mx-0.5 h-5 w-px bg-border" />
      <ZoomBtn label="Fit to view" onClick={onFit}>
        <Maximize size={14} />
      </ZoomBtn>
    </div>
  );
}

function ZoomBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="grid h-7 w-7 place-items-center rounded-md text-muted hover:bg-elevated hover:text-white"
    >
      {children}
    </button>
  );
}
