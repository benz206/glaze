"use client";

import { useEffect } from "react";
import { X, Wand2, Palette, Type, Image as ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useUIStore, type StudioTab } from "@/lib/ui";
import { cn } from "@/lib/cn";
import { PresetGallery } from "./PresetGallery";
import { ThemeGallery } from "./ThemeGallery";
import { FontGallery } from "./FontGallery";
import { BackgroundGallery } from "./BackgroundGallery";

const TABS: { value: StudioTab; label: string; icon: LucideIcon }[] = [
  { value: "styles", label: "Styles", icon: Wand2 },
  { value: "themes", label: "Themes", icon: Palette },
  { value: "fonts", label: "Fonts", icon: Type },
  { value: "backgrounds", label: "Backgrounds", icon: ImageIcon },
];

export function StudioModal() {
  const open = useUIStore((s) => s.studioOpen);
  const tab = useUIStore((s) => s.studioTab);
  const openStudio = useUIStore((s) => s.openStudio);
  const close = useUIStore((s) => s.closeStudio);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div
        onClick={close}
        className="glaze-fade absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-hidden
      />

      <div className="glaze-pop relative flex h-[84vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-panel shadow-2xl">
        <header className="flex items-center gap-4 border-b border-border px-5 py-3">
          <span className="text-sm font-semibold tracking-tight">Studio</span>

          <div className="flex gap-1 overflow-x-auto rounded-lg bg-control p-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => openStudio(t.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap",
                    active
                      ? "bg-accent text-white shadow-sm"
                      : "text-muted hover:bg-control-hover hover:text-white",
                  )}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={close}
            title="Close (Esc)"
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg border border-control-border bg-control text-muted hover:bg-control-hover hover:text-white active:scale-95"
          >
            <X size={15} />
          </button>
        </header>

        <div key={tab} className="glaze-fade glaze-scroll flex-1 overflow-y-auto p-5">
          {tab === "styles" && <PresetGallery />}
          {tab === "themes" && <ThemeGallery />}
          {tab === "fonts" && <FontGallery />}
          {tab === "backgrounds" && <BackgroundGallery />}
        </div>
      </div>
    </div>
  );
}
