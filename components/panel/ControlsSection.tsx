"use client";

import { Circle } from "lucide-react";
import { Section } from "../ui/Section";
import { ColorField, Field, Segmented, Toggle } from "../ui/Controls";
import { useSnippetStore } from "@/lib/store";
import type { TrafficLightStyle } from "@/lib/types";

const STYLE_OPTIONS: { label: string; value: TrafficLightStyle }[] = [
  { label: "macOS", value: "mac" },
  { label: "Mono", value: "mono" },
  { label: "Custom", value: "custom" },
];

export function ControlsSection() {
  const update = useSnippetStore((s) => s.set);
  const show = useSnippetStore((s) => s.showTrafficLights);
  const style = useSnippetStore((s) => s.trafficLightStyle);
  const colors = useSnippetStore((s) => s.trafficLightColors);
  const setColor = useSnippetStore((s) => s.setTrafficLightColor);

  return (
    <Section title="Window controls" icon={Circle}>
      <Toggle
        label="Show the three buttons"
        checked={show}
        onChange={(v) => update("showTrafficLights", v)}
      />

      {show && (
        <>
          <Field label="Style">
            <Segmented
              value={style}
              options={STYLE_OPTIONS}
              onChange={(v) => update("trafficLightStyle", v)}
            />
          </Field>

          {style === "custom" && (
            <div className="space-y-3">
              <ColorField label="Button 1" value={colors.close} onChange={(v) => setColor("close", v)} />
              <ColorField
                label="Button 2"
                value={colors.minimize}
                onChange={(v) => setColor("minimize", v)}
              />
              <ColorField
                label="Button 3"
                value={colors.maximize}
                onChange={(v) => setColor("maximize", v)}
              />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
