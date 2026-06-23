"use client";

import { useState } from "react";
import { Check, Search } from "lucide-react";
import { ThemePreview } from "./ThemePreview";
import { useSnippetStore } from "@/lib/store";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/cn";

type Appearance = "all" | "dark" | "light";

const APPEARANCES: { label: string; value: Appearance }[] = [
  { label: "All", value: "all" },
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
];

/** Snapshot the user's code into a compact preview sample (stable per mount). */
function makeSample(code: string): string {
  const out = code
    .replace(/\t/g, "  ")
    .split("\n")
    .slice(0, 10)
    .map((l) => (l.length > 60 ? l.slice(0, 60) : l))
    .join("\n")
    .trimEnd();
  return out || "// Glaze";
}

export function ThemeGallery() {
  const theme = useSnippetStore((s) => s.theme);
  const setTheme = useSnippetStore((s) => s.set);

  // Snapshot once per mount so previews don't re-highlight on every keystroke.
  const [sample] = useState(() => makeSample(useSnippetStore.getState().code));
  const [lang] = useState(() => useSnippetStore.getState().language);

  const [query, setQuery] = useState("");
  const [appearance, setAppearance] = useState<Appearance>("all");

  const q = query.trim().toLowerCase();
  const filtered = THEMES.filter(
    (t) =>
      (appearance === "all" || t.appearance === appearance) &&
      (q === "" || t.label.toLowerCase().includes(q) || t.id.includes(q)),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[12rem]">
          <Search
            size={14}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search themes…"
            className="w-full rounded-lg border border-border bg-panel-2 py-2 pr-3 pl-9 text-xs text-white outline-none placeholder:text-faint focus:border-accent"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-panel-2 p-1">
          {APPEARANCES.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => setAppearance(a.value)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                appearance === a.value
                  ? "bg-elevated text-white"
                  : "text-muted hover:text-white",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
        {filtered.map((t) => {
          const active = t.id === theme;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme("theme", t.id)}
              className="group flex flex-col gap-2 text-left"
            >
              <div
                className={cn(
                  "rounded-xl p-1 ring-1 transition-all",
                  active
                    ? "ring-2 ring-accent"
                    : "ring-border group-hover:ring-faint",
                )}
              >
                <ThemePreview themeId={t.id} sample={sample} lang={lang} />
              </div>
              <span className="flex items-center gap-1.5 px-0.5 text-xs font-medium">
                {active && <Check size={13} className="text-accent" />}
                <span className={active ? "text-white" : "text-muted group-hover:text-white"}>
                  {t.label}
                </span>
                {t.appearance === "light" && (
                  <span className="text-[10px] text-faint">☀</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-xs text-faint">No themes match “{query}”.</p>
      )}
    </div>
  );
}
