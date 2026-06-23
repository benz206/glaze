"use client";

import { Palette } from "lucide-react";
import { Section } from "../ui/Section";
import { ColorField, Field, Segmented, Slider, SwatchGrid, TextField, Toggle } from "../ui/Controls";
import { useSnippetStore } from "@/lib/store";
import { useUIStore } from "@/lib/ui";
import { GRADIENT_PRESETS, MESH_PRESETS, SOLID_SWATCHES } from "@/lib/backgrounds";
import type { BackgroundType } from "@/lib/types";

const TYPE_OPTIONS: { label: string; value: BackgroundType }[] = [
  { label: "Solid", value: "solid" },
  { label: "Gradient", value: "gradient" },
  { label: "Mesh", value: "mesh" },
  { label: "Image", value: "image" },
  { label: "None", value: "none" },
];

export function BackgroundSection() {
  const update = useSnippetStore((s) => s.set);
  const setBackground = useSnippetStore((s) => s.setBackground);
  const bg = useSnippetStore((s) => s.background);
  const padding = useSnippetStore((s) => s.backgroundPadding);
  const openStudio = useUIStore((s) => s.openStudio);

  return (
    <Section title="Background" icon={Palette}>
      <Segmented value={bg.type} options={TYPE_OPTIONS} onChange={(v) => setBackground({ type: v })} />

      {(bg.type === "solid" || bg.type === "gradient" || bg.type === "mesh") && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => openStudio("backgrounds")}
            className="text-[11px] font-medium text-accent transition-opacity hover:opacity-80"
          >
            Browse all
          </button>
        </div>
      )}

      {bg.type === "solid" && (
        <>
          <SwatchGrid
            items={SOLID_SWATCHES}
            active={bg.preset}
            onSelect={(id) => setBackground({ preset: id })}
          />
          <ColorField
            label="Custom"
            value={bg.solidColor}
            onChange={(v) => setBackground({ preset: "custom", solidColor: v })}
          />
        </>
      )}

      {bg.type === "gradient" && (
        <>
          <SwatchGrid
            items={GRADIENT_PRESETS}
            active={bg.preset}
            onSelect={(id) => setBackground({ preset: id })}
          />
          <div className="space-y-3 border-t border-border-soft pt-3.5">
            <ColorField
              label="From"
              value={bg.gradientFrom}
              onChange={(v) => setBackground({ preset: "custom", gradientFrom: v })}
            />
            <ColorField
              label="To"
              value={bg.gradientTo}
              onChange={(v) => setBackground({ preset: "custom", gradientTo: v })}
            />
            <Slider
              label="Angle"
              value={bg.gradientAngle}
              min={0}
              max={360}
              unit="°"
              onChange={(v) => setBackground({ preset: "custom", gradientAngle: v })}
            />
          </div>
        </>
      )}

      {bg.type === "mesh" && (
        <SwatchGrid items={MESH_PRESETS} active={bg.preset} onSelect={(id) => setBackground({ preset: id })} />
      )}

      {bg.type === "image" && (
        <Field label="Image URL">
          <TextField
            value={bg.imageUrl}
            placeholder="https://… or data:image/…"
            onChange={(v) => setBackground({ imageUrl: v })}
          />
        </Field>
      )}

      {bg.type === "none" && (
        <p className="rounded-lg bg-panel-2 px-3 py-2.5 text-xs text-faint">
          Transparent — the exported PNG keeps an alpha channel.
        </p>
      )}

      {bg.type !== "none" && (
        <Toggle label="Film grain" checked={bg.noise} onChange={(v) => setBackground({ noise: v })} />
      )}

      <Slider
        label="Inset"
        value={padding}
        min={0}
        max={160}
        unit="px"
        onChange={(v) => update("backgroundPadding", v)}
      />
    </Section>
  );
}
