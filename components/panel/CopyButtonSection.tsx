"use client";

import { ClipboardCheck } from "lucide-react";
import { Section } from "../ui/Section";
import { ColorField, Field, Segmented, Slider, TextField, Toggle } from "../ui/Controls";
import { useSnippetStore } from "@/lib/store";
import { COPY_ICONS } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { CopyButtonMode, CopyButtonVariant } from "@/lib/types";

const MODE_OPTIONS: { label: string; value: CopyButtonMode }[] = [
  { label: "Icon", value: "icon" },
  { label: "Text", value: "text" },
];

const VARIANT_OPTIONS: { label: string; value: CopyButtonVariant }[] = [
  { label: "Ghost", value: "ghost" },
  { label: "Solid", value: "solid" },
  { label: "Outline", value: "outline" },
];

export function CopyButtonSection() {
  const update = useSnippetStore((s) => s.set);
  const show = useSnippetStore((s) => s.showCopyButton);
  const mode = useSnippetStore((s) => s.copyButtonMode);
  const text = useSnippetStore((s) => s.copyButtonText);
  const icon = useSnippetStore((s) => s.copyButtonIcon);
  const variant = useSnippetStore((s) => s.copyButtonVariant);
  const color = useSnippetStore((s) => s.copyButtonColor);
  const radius = useSnippetStore((s) => s.copyButtonRadius);

  return (
    <Section title="Copy button" icon={ClipboardCheck}>
      <Toggle label="Show copy button" checked={show} onChange={(v) => update("showCopyButton", v)} />

      {show && (
        <>
          <Field label="Content">
            <Segmented value={mode} options={MODE_OPTIONS} onChange={(v) => update("copyButtonMode", v)} />
          </Field>

          {mode === "icon" ? (
            <Field label="Icon">
              <div className="grid grid-cols-6 gap-1.5">
                {COPY_ICONS.map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    title={label}
                    onClick={() => update("copyButtonIcon", id)}
                    className={cn(
                      "grid h-9 place-items-center rounded-lg border transition-colors",
                      icon === id
                        ? "border-accent bg-accent-soft text-white"
                        : "border-border bg-panel-2 text-muted hover:text-white",
                    )}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </Field>
          ) : (
            <Field label="Label text">
              <TextField value={text} placeholder="Copy" onChange={(v) => update("copyButtonText", v)} />
            </Field>
          )}

          <Field label="Style">
            <Segmented
              value={variant}
              options={VARIANT_OPTIONS}
              onChange={(v) => update("copyButtonVariant", v)}
            />
          </Field>

          <ColorField label="Color" value={color} onChange={(v) => update("copyButtonColor", v)} />

          <Slider
            label="Corner radius"
            value={radius}
            min={0}
            max={20}
            unit="px"
            onChange={(v) => update("copyButtonRadius", v)}
          />
        </>
      )}
    </Section>
  );
}
