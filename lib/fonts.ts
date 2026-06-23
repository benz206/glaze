// Monospace fonts available for the code. The `value` is a CSS font-family
// stack; the leading face is wired to a next/font variable in app/layout.tsx.

export interface FontMeta {
  id: string;
  label: string;
  value: string;
}

const MONO_FALLBACK =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

export const FONTS: FontMeta[] = [
  { id: "jetbrains-mono", label: "JetBrains Mono", value: `var(--font-jetbrains-mono), ${MONO_FALLBACK}` },
  { id: "geist-mono", label: "Geist Mono", value: `var(--font-geist-mono), ${MONO_FALLBACK}` },
  { id: "fira-code", label: "Fira Code", value: `var(--font-fira-code), ${MONO_FALLBACK}` },
  { id: "ibm-plex-mono", label: "IBM Plex Mono", value: `var(--font-ibm-plex-mono), ${MONO_FALLBACK}` },
  { id: "source-code-pro", label: "Source Code Pro", value: `var(--font-source-code-pro), ${MONO_FALLBACK}` },
  { id: "system-mono", label: "System Mono", value: MONO_FALLBACK },
];

export function fontValue(id: string): string {
  return FONTS.find((f) => f.id === id)?.value ?? FONTS[0].value;
}
