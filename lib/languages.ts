// Curated subset of Shiki's bundled languages. Each id is a valid Shiki
// BundledLanguage (or alias) that loads on demand.

export interface LanguageMeta {
  id: string;
  label: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { id: "tsx", label: "TSX" },
  { id: "typescript", label: "TypeScript" },
  { id: "jsx", label: "JSX" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "java", label: "Java" },
  { id: "c", label: "C" },
  { id: "cpp", label: "C++" },
  { id: "csharp", label: "C#" },
  { id: "ruby", label: "Ruby" },
  { id: "php", label: "PHP" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
  { id: "dart", label: "Dart" },
  { id: "scala", label: "Scala" },
  { id: "elixir", label: "Elixir" },
  { id: "haskell", label: "Haskell" },
  { id: "lua", label: "Lua" },
  { id: "zig", label: "Zig" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "scss", label: "SCSS" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "astro", label: "Astro" },
  { id: "json", label: "JSON" },
  { id: "yaml", label: "YAML" },
  { id: "toml", label: "TOML" },
  { id: "markdown", label: "Markdown" },
  { id: "bash", label: "Shell" },
  { id: "sql", label: "SQL" },
  { id: "graphql", label: "GraphQL" },
  { id: "docker", label: "Dockerfile" },
  { id: "diff", label: "Diff" },
  { id: "text", label: "Plain Text" },
];

export const LANGUAGE_IDS = LANGUAGES.map((l) => l.id);
