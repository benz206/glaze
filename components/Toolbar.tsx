"use client";

import { useState, type RefObject } from "react";
import { Check, Copy, Download, FileCode, LayoutGrid, RotateCcw, Sparkles } from "lucide-react";
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
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-panel px-4">
      <div className="flex items-center gap-2">
        <span className="glaze-grad grid h-7 w-7 place-items-center rounded-lg text-white shadow-sm">
          <Sparkles size={16} />
        </span>
        <span className="glaze-grad-text text-sm font-semibold tracking-tight">Glaze</span>
        <span className="hidden text-xs text-faint sm:inline">code → image</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {error && <span className="text-xs text-red-400">{error}</span>}

        <button
          type="button"
          onClick={() => openStudio()}
          className="glaze-grad flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <LayoutGrid size={15} />
          Studio
        </button>

        <div
          title="Export resolution"
          className="flex items-center rounded-lg border border-border bg-panel-2 p-0.5"
        >
          {SCALES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScale(s)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                scale === s ? "bg-elevated text-white" : "text-muted hover:text-white",
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
          className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-panel-2 text-muted hover:text-white"
        >
          <RotateCcw size={15} />
        </button>

        <button
          type="button"
          onClick={() => run("svg")}
          disabled={busy !== null}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-panel-2 px-3 text-xs font-medium text-white hover:bg-elevated disabled:opacity-50"
        >
          <FileCode size={15} />
          SVG
        </button>

        <button
          type="button"
          onClick={() => run("copy")}
          disabled={busy !== null}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-panel-2 px-3 text-xs font-medium text-white hover:bg-elevated disabled:opacity-50"
        >
          {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>

        <button
          type="button"
          onClick={() => run("png")}
          disabled={busy !== null}
          className="glaze-grad flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          <Download size={15} />
          {busy === "png" ? "Rendering…" : "Export PNG"}
        </button>
      </div>
    </header>
  );
}
