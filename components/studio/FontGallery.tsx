"use client";

import { Check } from "lucide-react";
import { useSnippetStore } from "@/lib/store";
import { FONTS, fontValue } from "@/lib/fonts";
import { cn } from "@/lib/cn";

const SAMPLE = `const greet = (name) => {
  return \`Hello, \${name}!\`; // 0O1lI <=> => !==`;

export function FontGallery() {
  const fontFamily = useSnippetStore((s) => s.fontFamily);
  const setFont = useSnippetStore((s) => s.set);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {FONTS.map((f) => {
        const active = f.id === fontFamily;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => setFont("fontFamily", f.id)}
            className={cn(
              "flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors",
              active
                ? "border-accent bg-accent-soft/40"
                : "border-border bg-panel-2 hover:border-faint",
            )}
          >
            <span className="flex items-center gap-1.5 text-xs font-medium">
              {active && <Check size={13} className="text-accent" />}
              <span className={active ? "text-white" : "text-muted"}>{f.label}</span>
            </span>
            <pre
              className="overflow-hidden text-[13px] leading-relaxed text-white/90"
              style={{ fontFamily: fontValue(f.id) }}
            >
              {SAMPLE}
            </pre>
          </button>
        );
      })}
    </div>
  );
}
