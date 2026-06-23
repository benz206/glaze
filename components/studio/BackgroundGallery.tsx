"use client";

import { useSnippetStore } from "@/lib/store";
import {
  GRADIENT_PRESETS,
  MESH_PRESETS,
  SOLID_SWATCHES,
  type Preset,
} from "@/lib/backgrounds";
import type { BackgroundType } from "@/lib/types";
import { cn } from "@/lib/cn";

function Group({
  title,
  type,
  items,
}: {
  title: string;
  type: BackgroundType;
  items: Preset[];
}) {
  const setBackground = useSnippetStore((s) => s.setBackground);
  const bg = useSnippetStore((s) => s.background);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">{title}</h3>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {items.map((item) => {
          const active = bg.type === type && bg.preset === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setBackground({ type, preset: item.id })}
              className="group flex flex-col gap-1.5 text-left"
            >
              <div
                style={{ background: item.css }}
                className={cn(
                  "h-20 rounded-xl ring-1 transition-all",
                  active
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-panel"
                    : "ring-border group-hover:ring-faint",
                )}
              />
              <span
                className={cn(
                  "px-0.5 text-[11px] font-medium",
                  active ? "text-white" : "text-faint group-hover:text-muted",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BackgroundGallery() {
  return (
    <div className="space-y-7">
      <Group title="Mesh" type="mesh" items={MESH_PRESETS} />
      <Group title="Gradient" type="gradient" items={GRADIENT_PRESETS} />
      <Group title="Solid" type="solid" items={SOLID_SWATCHES} />
    </div>
  );
}
