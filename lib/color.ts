// Tiny color helpers for the window-opacity blend and the color inputs.

/** Coerce any hex-ish string to a 6-digit `#rrggbb` (for <input type="color">). */
export function toHex6(input: string): string {
  let h = (input || "").trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 8) h = h.slice(0, 6);
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return "#000000";
  return `#${h.toLowerCase()}`;
}

/** Pick black or white text for legibility on the given hex background. */
export function readableTextColor(hex: string): string {
  let h = (hex || "").trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 8) h = h.slice(0, 6);
  const int = parseInt(h, 16);
  if (h.length !== 6 || Number.isNaN(int)) return "#ffffff";
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  // Relative luminance (sRGB, simple coefficients).
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000000" : "#ffffff";
}

/** Convert a hex color to an rgba() string with the given alpha (0–1). */
export function hexToRgba(hex: string, alpha: number): string {
  let h = (hex || "").trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 8) h = h.slice(0, 6);
  const int = parseInt(h, 16);
  if (h.length !== 6 || Number.isNaN(int)) return `rgba(13, 17, 23, ${alpha})`;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
