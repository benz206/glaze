// Lazy Shiki highlighter singleton. Themes and languages load on demand so the
// initial client bundle stays small — only what the user actually selects ships.

import { createHighlighter, type Highlighter } from "shiki";

const DEFAULT_THEME = "github-dark";
const DEFAULT_LANG = "tsx";
const PLAINTEXT = "text";

let instance: Highlighter | null = null;
let creating: Promise<Highlighter> | null = null;
const loadedThemes = new Set<string>();
const loadedLangs = new Set<string>();

async function getHighlighter(): Promise<Highlighter> {
  if (instance) return instance;
  if (!creating) {
    creating = createHighlighter({
      themes: [DEFAULT_THEME],
      langs: [DEFAULT_LANG],
    }).then((h) => {
      instance = h;
      loadedThemes.add(DEFAULT_THEME);
      loadedLangs.add(DEFAULT_LANG);
      return h;
    });
  }
  return creating;
}

export interface HighlightResult {
  html: string;
  bg: string;
  fg: string;
}

async function ensureTheme(h: Highlighter, theme: string): Promise<string> {
  if (loadedThemes.has(theme)) return theme;
  try {
    await h.loadTheme(theme as Parameters<Highlighter["loadTheme"]>[0]);
    loadedThemes.add(theme);
    return theme;
  } catch {
    return DEFAULT_THEME;
  }
}

async function ensureLang(h: Highlighter, lang: string): Promise<string> {
  if (lang === PLAINTEXT || lang === "plaintext" || lang === "txt") return PLAINTEXT;
  if (loadedLangs.has(lang)) return lang;
  try {
    await h.loadLanguage(lang as Parameters<Highlighter["loadLanguage"]>[0]);
    loadedLangs.add(lang);
    return lang;
  } catch {
    return PLAINTEXT;
  }
}

export async function highlight(
  code: string,
  lang: string,
  theme: string,
): Promise<HighlightResult> {
  const h = await getHighlighter();
  const resolvedTheme = await ensureTheme(h, theme);
  const resolvedLang = await ensureLang(h, lang);

  const html = h.codeToHtml(code, { lang: resolvedLang, theme: resolvedTheme });
  const meta = h.getTheme(resolvedTheme);
  return {
    html,
    bg: meta.bg || "#0d1117",
    fg: meta.fg || "#e6edf3",
  };
}
