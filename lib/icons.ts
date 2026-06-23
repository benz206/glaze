// Icon options for the copy button, mapped to lucide-react components.

import { Copy, Clipboard, ClipboardCopy, Files, Check, Code2, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface IconOption {
  id: string;
  label: string;
  Icon: LucideIcon;
}

export const COPY_ICONS: IconOption[] = [
  { id: "copy", label: "Copy", Icon: Copy },
  { id: "clipboard", label: "Clipboard", Icon: Clipboard },
  { id: "clipboard-copy", label: "Clipboard +", Icon: ClipboardCopy },
  { id: "files", label: "Files", Icon: Files },
  { id: "code", label: "Code", Icon: Code2 },
  { id: "terminal", label: "Terminal", Icon: Terminal },
];

export const CHECK_ICON: LucideIcon = Check;

export function iconById(id: string): LucideIcon {
  return COPY_ICONS.find((i) => i.id === id)?.Icon ?? Copy;
}
