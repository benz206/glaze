"use client";

import { X } from "lucide-react";
import { MAC_DOTS, MONO_DOTS, type StylePreset } from "@/lib/presets";
import { resolveBackground } from "@/lib/backgrounds";
import { cn } from "@/lib/cn";

const BAR_WIDTHS = ["78%", "54%", "66%", "42%"];

/** Shiki-free mock of a preset: real background behind a tiny window. */
export function PresetThumb({ preset }: { preset: StylePreset }) {
  const { settings, preview } = preset;
  const { style } = resolveBackground(
    settings.background ?? {
      type: "solid",
      preset: "ink",
      solidColor: "#111114",
      gradientFrom: "#9b5de5",
      gradientTo: "#4361ee",
      gradientAngle: 135,
      imageUrl: "",
      noise: false,
    },
  );

  const dots =
    preview.dots === "mac" ? MAC_DOTS : preview.dots === "mono" ? MONO_DOTS : null;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg bg-panel-2"
      style={style}
    >
      <div
        className="absolute top-1/2 left-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-md p-2 shadow-lg ring-1 ring-black/10"
        style={{ background: preview.windowBg }}
      >
        {dots && (
          <div className="mb-1.5 flex gap-1">
            {dots.map((c, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
        )}
        <div className="space-y-1">
          {preview.bars.map((c, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full"
              style={{ background: c, width: BAR_WIDTHS[i % BAR_WIDTHS.length], opacity: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A preset thumbnail with its name, used in galleries. */
export function PresetCard({
  preset,
  active,
  onSelect,
  onDelete,
}: {
  preset: StylePreset;
  active?: boolean;
  onSelect: (preset: StylePreset) => void;
  /** When provided, shows a delete button on hover (for custom presets). */
  onDelete?: (preset: StylePreset) => void;
}) {
  return (
    <div className="group relative flex flex-col gap-2">
      <button
        type="button"
        onClick={() => onSelect(preset)}
        className="flex flex-col gap-2 text-left"
      >
        <div
          className={cn(
            "aspect-[4/3] overflow-hidden rounded-xl ring-1 transition-all",
            active
              ? "ring-2 ring-accent ring-offset-2 ring-offset-panel"
              : "ring-border group-hover:ring-faint",
          )}
        >
          <PresetThumb preset={preset} />
        </div>
        <span
          className={cn(
            "px-0.5 text-xs font-medium transition-colors",
            active ? "text-white" : "text-muted group-hover:text-white",
          )}
        >
          {preset.name}
        </span>
      </button>

      {onDelete && (
        <button
          type="button"
          title="Delete style"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(preset);
          }}
          className="absolute right-1.5 top-1.5 hidden h-6 w-6 place-items-center rounded-md bg-black/55 text-white/90 backdrop-blur-sm transition-colors hover:bg-red-500/80 group-hover:grid"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
