"use client";

import { createElement, useState } from "react";
import { useSnippetStore } from "@/lib/store";
import { CHECK_ICON, iconById } from "@/lib/icons";
import { readableTextColor } from "@/lib/color";

export function CopyButton() {
  const show = useSnippetStore((s) => s.showCopyButton);
  const mode = useSnippetStore((s) => s.copyButtonMode);
  const text = useSnippetStore((s) => s.copyButtonText);
  const iconId = useSnippetStore((s) => s.copyButtonIcon);
  const variant = useSnippetStore((s) => s.copyButtonVariant);
  const color = useSnippetStore((s) => s.copyButtonColor);
  const radius = useSnippetStore((s) => s.copyButtonRadius);
  const code = useSnippetStore((s) => s.code);

  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const icon = copied ? CHECK_ICON : iconById(iconId);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  }

  const style: React.CSSProperties = { borderRadius: radius };
  if (variant === "solid") {
    style.background = color;
    style.color = readableTextColor(color);
  } else if (variant === "outline") {
    style.border = `1px solid ${color}`;
    style.color = color;
  } else {
    // ghost
    style.color = color;
    style.background = "rgba(127,127,127,0.12)";
  }

  return (
    <button
      type="button"
      onClick={copy}
      style={style}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium leading-none backdrop-blur-sm transition-opacity hover:opacity-80"
    >
      {createElement(icon, { size: mode === "text" ? 13 : 15 })}
      {mode === "text" && <span>{copied ? "Copied!" : text}</span>}
    </button>
  );
}
