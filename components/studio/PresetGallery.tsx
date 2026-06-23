"use client";

import { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { PresetCard } from "./PresetCard";
import { useSnippetStore, pickLook } from "@/lib/store";
import {
  useCustomPresets,
  useHydrateCustomPresets,
  type CustomPreset,
} from "@/lib/customPresets";
import {
  PRESETS,
  previewFromSettings,
  type StylePreset,
} from "@/lib/presets";

/** Turn a stored custom preset into the StylePreset shape PresetCard expects. */
function asStylePreset(c: CustomPreset): StylePreset {
  return { id: c.id, name: c.name, settings: c.settings, preview: previewFromSettings(c.settings) };
}

function SaveStyleCard() {
  const add = useCustomPresets((s) => s.add);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const commit = () => {
    add(name, pickLook(useSnippetStore.getState()));
    setName("");
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-muted transition-colors hover:border-faint hover:text-white"
      >
        <Plus size={18} />
        <span className="text-xs font-medium">Save current</span>
      </button>
    );
  }

  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-2 rounded-xl border border-accent/60 bg-panel-2 p-2.5">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        placeholder="Style name"
        className="w-full rounded-md border border-border bg-panel px-2 py-1.5 text-xs text-white outline-none placeholder:text-faint focus:border-accent"
      />
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={commit}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-accent py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          <Check size={13} /> Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="grid w-8 place-items-center rounded-md border border-border text-muted hover:text-white"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

export function PresetGallery() {
  useHydrateCustomPresets();

  const applyPreset = useSnippetStore((s) => s.applyPreset);
  const theme = useSnippetStore((s) => s.theme);
  const bgPreset = useSnippetStore((s) => s.background.preset);

  const custom = useCustomPresets((s) => s.presets);
  const remove = useCustomPresets((s) => s.remove);

  const isActive = (p: StylePreset) =>
    p.settings.theme === theme && p.settings.background?.preset === bgPreset;

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold tracking-tight text-white">Your styles</h3>
          <span className="text-xs text-faint">
            {custom.length > 0
              ? `${custom.length} saved`
              : "Save the current look to reuse it"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <SaveStyleCard />
          {custom.map((c) => {
            const sp = asStylePreset(c);
            return (
              <PresetCard
                key={c.id}
                preset={sp}
                active={isActive(sp)}
                onSelect={() => applyPreset(c.settings)}
                onDelete={() => remove(c.id)}
              />
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight text-white">
          Built-in styles
          <span className="ml-2 text-xs font-normal text-faint">{PRESETS.length}</span>
        </h3>
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
      </section>
    </div>
  );
}
