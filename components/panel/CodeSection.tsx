"use client";

import { Code2 } from "lucide-react";
import { Section } from "../ui/Section";
import { Field, Select, Slider, Toggle } from "../ui/Controls";
import { useSnippetStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/languages";
import { THEMES } from "@/lib/themes";
import { FONTS } from "@/lib/fonts";

export function CodeSection() {
  const update = useSnippetStore((s) => s.set);
  const language = useSnippetStore((s) => s.language);
  const theme = useSnippetStore((s) => s.theme);
  const fontFamily = useSnippetStore((s) => s.fontFamily);
  const fontSize = useSnippetStore((s) => s.fontSize);
  const lineHeight = useSnippetStore((s) => s.lineHeight);
  const showLineNumbers = useSnippetStore((s) => s.showLineNumbers);
  const wrap = useSnippetStore((s) => s.wrap);

  return (
    <Section title="Code" icon={Code2}>
      <Field label="Language">
        <Select
          value={language}
          onChange={(v) => update("language", v)}
          options={LANGUAGES.map((l) => ({ label: l.label, value: l.id }))}
        />
      </Field>

      <Field label="Syntax theme">
        <Select
          value={theme}
          onChange={(v) => update("theme", v)}
          options={THEMES.map((t) => ({
            label: `${t.label}${t.appearance === "light" ? " ☀" : ""}`,
            value: t.id,
          }))}
        />
      </Field>

      <Field label="Font">
        <Select
          value={fontFamily}
          onChange={(v) => update("fontFamily", v)}
          options={FONTS.map((f) => ({ label: f.label, value: f.id }))}
        />
      </Field>

      <Slider
        label="Font size"
        value={fontSize}
        min={10}
        max={28}
        unit="px"
        onChange={(v) => update("fontSize", v)}
      />
      <Slider
        label="Line height"
        value={lineHeight}
        min={1}
        max={2.4}
        step={0.05}
        onChange={(v) => update("lineHeight", v)}
      />

      <Toggle
        label="Line numbers"
        checked={showLineNumbers}
        onChange={(v) => update("showLineNumbers", v)}
      />
      <Toggle label="Wrap lines" checked={wrap} onChange={(v) => update("wrap", v)} />
    </Section>
  );
}
