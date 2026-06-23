"use client";

import { useEffect, useState } from "react";
import { highlight } from "@/lib/highlighter";

/**
 * A small, read-only Shiki render of `sample` in a given theme. Reuses the lazy
 * highlighter singleton, so each theme's grammar/JSON loads at most once. Shows
 * a skeleton until the highlight resolves (themes load on demand).
 */
export function ThemePreview({
  themeId,
  sample,
  lang,
}: {
  themeId: string;
  sample: string;
  lang: string;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const [bg, setBg] = useState("#0d1117");

  useEffect(() => {
    let cancelled = false;
    highlight(sample, lang, themeId)
      .then((res) => {
        if (cancelled) return;
        setHtml(res.html);
        setBg(res.bg);
      })
      .catch(() => {
        /* ignore; skeleton stays */
      });
    return () => {
      cancelled = true;
    };
  }, [themeId, sample, lang]);

  return (
    <div
      className="glaze-preview h-32 overflow-hidden rounded-lg ring-1 ring-black/20"
      style={{ background: bg }}
    >
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className="h-full w-full animate-pulse" />
      )}
    </div>
  );
}
