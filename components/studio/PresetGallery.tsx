"use client";

import { PresetCard } from "./PresetCard";
import { useSnippetStore } from "@/lib/store";
import { PRESETS, type StylePreset } from "@/lib/presets";

export function PresetGallery() {
  const applyPreset = useSnippetStore((s) => s.applyPreset);
  const theme = useSnippetStore((s) => s.theme);
  const bgPreset = useSnippetStore((s) => s.background.preset);

  const isActive = (p: StylePreset) =>
    p.settings.theme === theme && p.settings.background?.preset === bgPreset;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {PRESETS.map((p) => (
        <PresetCard
          key={p.id}
          preset={p}
          active={isActive(p)}
          onSelect={(preset) => applyPreset(preset.settings)}
        />
      ))}
    </div>
  );
}
