"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { toHex6 } from "@/lib/color";

/* ------------------------------------------------------------------ Row --- */

export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted">{label}</span>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- Slider --- */

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums text-faint">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

/* --------------------------------------------------------------- Toggle --- */

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between"
    >
      <span className="text-xs text-muted">{label}</span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          checked ? "bg-accent" : "bg-elevated",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4",
          )}
        />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------ Segmented --- */

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg bg-panel-2 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            value === o.value
              ? "bg-elevated text-white shadow-sm"
              : "text-muted hover:text-white",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- Select --- */

export function Select<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full appearance-none rounded-lg border border-border bg-panel-2 py-2 pr-8 pl-3 text-xs text-white outline-none focus:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-faint"
      />
    </div>
  );
}

/* ----------------------------------------------------------- TextField --- */

export function TextField({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-panel-2 px-3 py-2 text-xs text-white outline-none placeholder:text-faint focus:border-accent"
    />
  );
}

/* ---------------------------------------------------------- ColorField --- */

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Row label={label}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-[5.5rem] rounded-md border border-border bg-panel-2 px-2 py-1 text-right font-mono text-[11px] text-white outline-none focus:border-accent"
        />
        <div className="relative h-7 w-7 overflow-hidden rounded-md ring-1 ring-border">
          <input
            type="color"
            value={toHex6(value)}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </Row>
  );
}

/* ----------------------------------------------------------- SwatchGrid --- */

export function SwatchGrid({
  items,
  active,
  onSelect,
}: {
  items: { id: string; label: string; css: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          title={item.label}
          onClick={() => onSelect(item.id)}
          style={{ background: item.css }}
          className={cn(
            "h-11 rounded-lg ring-1 transition-all",
            active === item.id
              ? "ring-2 ring-accent ring-offset-2 ring-offset-panel"
              : "ring-border hover:ring-faint",
          )}
        />
      ))}
    </div>
  );
}
