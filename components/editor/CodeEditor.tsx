"use client";

import { useEffect, useState } from "react";
import { useSnippetStore } from "@/lib/store";
import { highlight } from "@/lib/highlighter";
import { fontValue } from "@/lib/fonts";
import { cn } from "@/lib/cn";

export interface ThemeColors {
  bg: string;
  fg: string;
}

export function CodeEditor({
  onResolve,
}: {
  onResolve: (colors: ThemeColors) => void;
}) {
  const code = useSnippetStore((s) => s.code);
  const update = useSnippetStore((s) => s.set);
  const language = useSnippetStore((s) => s.language);
  const theme = useSnippetStore((s) => s.theme);
  const fontFamily = useSnippetStore((s) => s.fontFamily);
  const fontSize = useSnippetStore((s) => s.fontSize);
  const lineHeight = useSnippetStore((s) => s.lineHeight);
  const showLineNumbers = useSnippetStore((s) => s.showLineNumbers);
  const wrap = useSnippetStore((s) => s.wrap);

  const [html, setHtml] = useState("");
  const [fg, setFg] = useState("#e6edf3");

  useEffect(() => {
    let cancelled = false;
    highlight(code, language, theme)
      .then((res) => {
        if (cancelled) return;
        setHtml(res.html);
        setFg(res.fg);
        onResolve({ bg: res.bg, fg: res.fg });
      })
      .catch(() => {
        /* highlighting failed; fallback plain text stays visible */
      });
    return () => {
      cancelled = true;
    };
  }, [code, language, theme, onResolve]);

  const lineCount = code.split("\n").length;

  return (
    <div
      className={cn("glaze-code flex", wrap && "wrap")}
      style={{ fontFamily: fontValue(fontFamily), fontSize, lineHeight }}
    >
      {showLineNumbers && (
        <div
          aria-hidden
          className="shrink-0 select-none pr-4 text-right tabular-nums"
          style={{ color: "rgba(127,127,127,0.45)", whiteSpace: "pre" }}
        >
          {Array.from({ length: lineCount }, (_, i) => i + 1).join("\n")}
        </div>
      )}

      <div className="relative min-w-0 flex-1">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          // Fallback before the first async highlight resolves.
          <pre className="shiki" style={{ color: fg }}>
            {code}
          </pre>
        )}
        <textarea
          className="glaze-input"
          style={{ caretColor: fg }}
          value={code}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          onChange={(e) => update("code", e.target.value)}
        />
      </div>
    </div>
  );
}
