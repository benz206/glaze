"use client";

import { useState, type RefObject } from "react";
import { Check, Copy, Download, FileCode, LayoutGrid, RotateCcw } from "lucide-react";
import { GlazeLogo } from "@/components/GlazeLogo";
import { useSnippetStore } from "@/lib/store";
import { useUIStore } from "@/lib/ui";
import { copyImageToClipboard, exportImage } from "@/lib/export";
import { cn } from "@/lib/cn";

const SCALES = [1, 2, 3];

function filename(title: string, ext: string): string {
  const base =
    (title.trim() || "glaze")
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "glaze";
  return `${base}.${ext}`;
}

export function Toolbar({ canvasRef }: { canvasRef: RefObject<HTMLDivElement | null> }) {
  const title = useSnippetStore((s) => s.title);
  const reset = useSnippetStore((s) => s.reset);
  const openStudio = useUIStore((s) => s.openStudio);

  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState<null | "png" | "svg" | "copy">(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(kind: "png" | "svg" | "copy") {
    const node = canvasRef.current;
    if (!node || busy) return;
    setBusy(kind);
    setError(null);
    try {
      if (kind === "copy") {
        await copyImageToClipboard(node, scale);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      } else {
        await exportImage(node, kind, scale, filename(title, kind));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
      setTimeout(() => setError(null), 3500);
    } finally {
      setBusy(null);
    }
  }

  return (
    <header className="glaze-animate-in flex h-14 shrink-0 items-center gap-4 border-b border-border bg-panel px-4">
      <div className="flex items-center gap-2">
        <GlazeLogo className="h-7 w-7 drop-shadow-sm" />
        <span className="glaze-grad-text text-sm font-semibold tracking-tight">Glaze</span>
        <span className="hidden text-xs text-faint sm:inline">code → image</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {error && <span className="text-xs text-red-400">{error}</span>}

        <button
          type="button"
          onClick={() => openStudio()}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-white shadow-sm hover:brightness-110 active:scale-[0.98] active:brightness-95"
        >
          <LayoutGrid size={15} />
          Studio
        </button>

        <div
          title="Export resolution"
          className="flex items-center rounded-lg border border-control-border bg-control p-0.5"
        >
          {SCALES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScale(s)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium",
                scale === s
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:bg-control-hover hover:text-white",
              )}
            >
              {s}×
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={reset}
          title="Reset to defaults"
          className="grid h-8 w-8 place-items-center rounded-lg border border-control-border bg-control text-muted hover:bg-control-hover hover:text-white active:scale-95"
        >
          <RotateCcw size={15} />
        </button>

        <button
          type="button"
          onClick={() => run("svg")}
          disabled={busy !== null}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-control-border bg-control px-3 text-xs font-medium text-white hover:bg-control-hover active:scale-[0.98] disabled:opacity-50"
        >
          <FileCode size={15} />
          SVG
        </button>

        <button
          type="button"
          onClick={() => run("copy")}
          disabled={busy !== null}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-control-border bg-control px-3 text-xs font-medium text-white hover:bg-control-hover active:scale-[0.98] disabled:opacity-50"
        >
          {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>

        <button
          type="button"
          onClick={() => run("png")}
          disabled={busy !== null}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-white hover:brightness-110 active:scale-[0.98] active:brightness-95 disabled:opacity-50"
        >
          <Download size={15} />
          {busy === "png" ? "Rendering…" : "Export PNG"}
        </button>
      </div>
    </header>
  );
}
