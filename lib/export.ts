// Export helpers built on html-to-image. The capture target is the canvas node,
// which paints its own background (or stays transparent for the "none" style),
// so we never ask html-to-image to add one.

import { toBlob, toPng, toSvg } from "html-to-image";

export type ExportFormat = "png" | "svg";

// Skip any node tagged for export omission (resize handles, focus rings, …).
function filter(node: HTMLElement): boolean {
  return !(node instanceof HTMLElement && node.dataset?.exportIgnore === "true");
}

function baseOptions(scale: number) {
  return { pixelRatio: scale, cacheBust: true, filter } as const;
}

async function ready() {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      /* font loading is best-effort */
    }
  }
}

export async function toDataUrl(
  node: HTMLElement,
  format: ExportFormat,
  scale: number,
): Promise<string> {
  await ready();
  const options = baseOptions(scale);
  return format === "png" ? toPng(node, options) : toSvg(node, options);
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function exportImage(
  node: HTMLElement,
  format: ExportFormat,
  scale: number,
  filename: string,
) {
  const dataUrl = await toDataUrl(node, format, scale);
  downloadDataUrl(dataUrl, filename);
}

export async function copyImageToClipboard(node: HTMLElement, scale: number) {
  await ready();
  const blob = await toBlob(node, baseOptions(scale));
  if (!blob) throw new Error("Could not render image");
  if (!("clipboard" in navigator) || !("write" in navigator.clipboard)) {
    throw new Error("Clipboard images are not supported in this browser");
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}
