// Curated subset of Shiki's bundled themes, grouped for the picker.
// Every id here is a valid Shiki BundledTheme.

export interface ThemeMeta {
  id: string;
  label: string;
  appearance: "dark" | "light";
}

export const THEMES: ThemeMeta[] = [
  // Dark
  { id: "github-dark", label: "GitHub Dark", appearance: "dark" },
  { id: "github-dark-dimmed", label: "GitHub Dimmed", appearance: "dark" },
  { id: "one-dark-pro", label: "One Dark Pro", appearance: "dark" },
  { id: "dracula", label: "Dracula", appearance: "dark" },
  { id: "dracula-soft", label: "Dracula Soft", appearance: "dark" },
  { id: "nord", label: "Nord", appearance: "dark" },
  { id: "tokyo-night", label: "Tokyo Night", appearance: "dark" },
  { id: "night-owl", label: "Night Owl", appearance: "dark" },
  { id: "material-theme-ocean", label: "Material Ocean", appearance: "dark" },
  { id: "material-theme-palenight", label: "Material Palenight", appearance: "dark" },
  { id: "catppuccin-mocha", label: "Catppuccin Mocha", appearance: "dark" },
  { id: "catppuccin-macchiato", label: "Catppuccin Macchiato", appearance: "dark" },
  { id: "rose-pine", label: "Rosé Pine", appearance: "dark" },
  { id: "rose-pine-moon", label: "Rosé Pine Moon", appearance: "dark" },
  { id: "vesper", label: "Vesper", appearance: "dark" },
  { id: "vitesse-dark", label: "Vitesse Dark", appearance: "dark" },
  { id: "synthwave-84", label: "Synthwave '84", appearance: "dark" },
  { id: "monokai", label: "Monokai", appearance: "dark" },
  { id: "ayu-dark", label: "Ayu Dark", appearance: "dark" },
  { id: "kanagawa-wave", label: "Kanagawa Wave", appearance: "dark" },
  { id: "everforest-dark", label: "Everforest Dark", appearance: "dark" },
  { id: "aurora-x", label: "Aurora X", appearance: "dark" },
  { id: "min-dark", label: "Min Dark", appearance: "dark" },
  { id: "slack-dark", label: "Slack Dark", appearance: "dark" },

  // Light
  { id: "github-light", label: "GitHub Light", appearance: "light" },
  { id: "one-light", label: "One Light", appearance: "light" },
  { id: "catppuccin-latte", label: "Catppuccin Latte", appearance: "light" },
  { id: "rose-pine-dawn", label: "Rosé Pine Dawn", appearance: "light" },
  { id: "vitesse-light", label: "Vitesse Light", appearance: "light" },
  { id: "min-light", label: "Min Light", appearance: "light" },
  { id: "everforest-light", label: "Everforest Light", appearance: "light" },
];

export const THEME_IDS = THEMES.map((t) => t.id);
