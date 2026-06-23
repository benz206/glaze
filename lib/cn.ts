// Minimal classname joiner (clsx-lite) — avoids a dependency for trivial needs.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
