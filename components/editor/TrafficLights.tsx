"use client";

import { useSnippetStore } from "@/lib/store";

const MAC = ["#ff5f57", "#febc2e", "#28c840"];
const MONO = ["#414148", "#414148", "#414148"];

export function TrafficLights() {
  const style = useSnippetStore((s) => s.trafficLightStyle);
  const custom = useSnippetStore((s) => s.trafficLightColors);

  const dots =
    style === "mac"
      ? MAC
      : style === "mono"
        ? MONO
        : [custom.close, custom.minimize, custom.maximize];

  return (
    <div className="flex items-center gap-2">
      {dots.map((color, i) => (
        <span
          key={i}
          style={{ background: color }}
          className="h-3 w-3 rounded-full"
        />
      ))}
    </div>
  );
}
