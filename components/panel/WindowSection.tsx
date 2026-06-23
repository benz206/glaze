"use client";

import { AppWindowMac } from "lucide-react";
import { Section } from "../ui/Section";
import { Field, Segmented, Slider, TextField, Toggle } from "../ui/Controls";
import { useSnippetStore } from "@/lib/store";
import type { ShadowPreset } from "@/lib/types";

const SHADOW_OPTIONS: { label: string; value: ShadowPreset }[] = [
  { label: "None", value: "none" },
  { label: "S", value: "sm" },
  { label: "M", value: "md" },
  { label: "L", value: "lg" },
  { label: "XL", value: "xl" },
  { label: "Glow", value: "glow" },
];

export function WindowSection() {
  const update = useSnippetStore((s) => s.set);
  const width = useSnippetStore((s) => s.windowWidth);
  const radius = useSnippetStore((s) => s.windowRadius);
  const opacity = useSnippetStore((s) => s.windowOpacity);
  const padding = useSnippetStore((s) => s.windowPadding);
  const shadow = useSnippetStore((s) => s.shadow);
  const border = useSnippetStore((s) => s.showWindowBorder);
  const showTitle = useSnippetStore((s) => s.showTitle);
  const title = useSnippetStore((s) => s.title);

  return (
    <Section title="Window" icon={AppWindowMac}>
      <Slider
        label="Width"
        value={width}
        min={360}
        max={1080}
        unit="px"
        onChange={(v) => update("windowWidth", v)}
      />
      <Slider
        label="Corner radius"
        value={radius}
        min={0}
        max={32}
        unit="px"
        onChange={(v) => update("windowRadius", v)}
      />
      <Slider
        label="Opacity"
        value={opacity}
        min={20}
        max={100}
        unit="%"
        onChange={(v) => update("windowOpacity", v)}
      />
      <Slider
        label="Padding"
        value={padding}
        min={8}
        max={48}
        unit="px"
        onChange={(v) => update("windowPadding", v)}
      />

      <Field label="Shadow">
        <Segmented value={shadow} options={SHADOW_OPTIONS} onChange={(v) => update("shadow", v)} />
      </Field>

      <Toggle
        label="Border highlight"
        checked={border}
        onChange={(v) => update("showWindowBorder", v)}
      />

      <div className="border-t border-border-soft pt-3.5">
        <Toggle label="Title bar text" checked={showTitle} onChange={(v) => update("showTitle", v)} />
      </div>
      {showTitle && (
        <TextField
          value={title}
          placeholder="Untitled.tsx"
          onChange={(v) => update("title", v)}
        />
      )}
    </Section>
  );
}
