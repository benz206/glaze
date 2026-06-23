"use client";

import { Wand2, LayoutGrid, Plus } from "lucide-react";
import { Section } from "../ui/Section";
import { PresetCard } from "../studio/PresetCard";
import { useSnippetStore } from "@/lib/store";
import { useUIStore } from "@/lib/ui";
import { PRESETS, type StylePreset } from "@/lib/presets";

export function PresetSection() {
  const applyPreset = useSnippetStore((s) => s.applyPreset);
  const theme = useSnippetStore((s) => s.theme);
  const bgPreset = useSnippetStore((s) => s.background.preset);
  const openStudio = useUIStore((s) => s.openStudio);

  const isActive = (p: StylePreset) =>
    p.settings.theme === theme && p.settings.background?.preset === bgPreset;

  return (
    <Section title="Styles" icon={Wand2}>
      <div className="grid grid-cols-3 gap-2.5">
        {PRESETS.slice(0, 6).map((p) => (
          <PresetCard
            key={p.id}
            preset={p}
            active={isActive(p)}
            onSelect={(preset) => applyPreset(preset.settings)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => openStudio("styles")}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-panel-2 py-2 text-xs font-medium text-muted transition-colors hover:text-white"
        >
          <LayoutGrid size={14} />
          Browse all
        </button>
        <button
          type="button"
          onClick={() => openStudio("styles")}
          title="Save the current look as a reusable style"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-panel-2 py-2 text-xs font-medium text-muted transition-colors hover:text-white"
        >
          <Plus size={14} />
          Save current
        </button>
      </div>
    </Section>
  );
}
