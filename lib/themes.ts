// Curated subset of Shiki's bundled themes, grouped for the picker.
// Every id here is a valid Shiki BundledTheme (verified against
// @shikijs/themes). Real per-theme colors live in themeColors.ts.

export interface ThemeMeta {
  id: string;
  label: string;
  appearance: "dark" | "light";
}

export const THEMES: ThemeMeta[] = [
  // ---- Dark ----
  { id: "github-dark", label: "GitHub Dark", appearance: "dark" },
  { id: "github-dark-default", label: "GitHub Dark (Default)", appearance: "dark" },
  { id: "github-dark-dimmed", label: "GitHub Dimmed", appearance: "dark" },
  { id: "github-dark-high-contrast", label: "GitHub Dark HC", appearance: "dark" },
  { id: "one-dark-pro", label: "One Dark Pro", appearance: "dark" },
  { id: "dark-plus", label: "Dark+ (VS Code)", appearance: "dark" },
  { id: "dracula", label: "Dracula", appearance: "dark" },
  { id: "dracula-soft", label: "Dracula Soft", appearance: "dark" },
  { id: "nord", label: "Nord", appearance: "dark" },
  { id: "tokyo-night", label: "Tokyo Night", appearance: "dark" },
  { id: "night-owl", label: "Night Owl", appearance: "dark" },
  { id: "material-theme", label: "Material", appearance: "dark" },
  { id: "material-theme-darker", label: "Material Darker", appearance: "dark" },
  { id: "material-theme-ocean", label: "Material Ocean", appearance: "dark" },
  { id: "material-theme-palenight", label: "Material Palenight", appearance: "dark" },
  { id: "catppuccin-mocha", label: "Catppuccin Mocha", appearance: "dark" },
  { id: "catppuccin-macchiato", label: "Catppuccin Macchiato", appearance: "dark" },
  { id: "catppuccin-frappe", label: "Catppuccin Frappé", appearance: "dark" },
  { id: "rose-pine", label: "Rosé Pine", appearance: "dark" },
  { id: "rose-pine-moon", label: "Rosé Pine Moon", appearance: "dark" },
  { id: "vesper", label: "Vesper", appearance: "dark" },
  { id: "vitesse-dark", label: "Vitesse Dark", appearance: "dark" },
  { id: "vitesse-black", label: "Vitesse Black", appearance: "dark" },
  { id: "synthwave-84", label: "Synthwave '84", appearance: "dark" },
  { id: "monokai", label: "Monokai", appearance: "dark" },
  { id: "ayu-dark", label: "Ayu Dark", appearance: "dark" },
  { id: "ayu-mirage", label: "Ayu Mirage", appearance: "dark" },
  { id: "kanagawa-wave", label: "Kanagawa Wave", appearance: "dark" },
  { id: "kanagawa-dragon", label: "Kanagawa Dragon", appearance: "dark" },
  { id: "everforest-dark", label: "Everforest Dark", appearance: "dark" },
  { id: "gruvbox-dark-hard", label: "Gruvbox Dark Hard", appearance: "dark" },
  { id: "gruvbox-dark-medium", label: "Gruvbox Dark", appearance: "dark" },
  { id: "gruvbox-dark-soft", label: "Gruvbox Dark Soft", appearance: "dark" },
  { id: "aurora-x", label: "Aurora X", appearance: "dark" },
  { id: "andromeeda", label: "Andromeeda", appearance: "dark" },
  { id: "poimandres", label: "Poimandres", appearance: "dark" },
  { id: "laserwave", label: "LaserWave", appearance: "dark" },
  { id: "horizon", label: "Horizon", appearance: "dark" },
  { id: "houston", label: "Houston", appearance: "dark" },
  { id: "plastic", label: "Plastic", appearance: "dark" },
  { id: "red", label: "Red", appearance: "dark" },
  { id: "solarized-dark", label: "Solarized Dark", appearance: "dark" },
  { id: "min-dark", label: "Min Dark", appearance: "dark" },
  { id: "slack-dark", label: "Slack Dark", appearance: "dark" },

  // ---- Light ----
  { id: "github-light", label: "GitHub Light", appearance: "light" },
  { id: "github-light-default", label: "GitHub Light (Default)", appearance: "light" },
  { id: "github-light-high-contrast", label: "GitHub Light HC", appearance: "light" },
  { id: "one-light", label: "One Light", appearance: "light" },
  { id: "light-plus", label: "Light+ (VS Code)", appearance: "light" },
  { id: "catppuccin-latte", label: "Catppuccin Latte", appearance: "light" },
  { id: "rose-pine-dawn", label: "Rosé Pine Dawn", appearance: "light" },
  { id: "vitesse-light", label: "Vitesse Light", appearance: "light" },
  { id: "ayu-light", label: "Ayu Light", appearance: "light" },
  { id: "kanagawa-lotus", label: "Kanagawa Lotus", appearance: "light" },
  { id: "material-theme-lighter", label: "Material Lighter", appearance: "light" },
  { id: "everforest-light", label: "Everforest Light", appearance: "light" },
  { id: "gruvbox-light-hard", label: "Gruvbox Light Hard", appearance: "light" },
  { id: "gruvbox-light-medium", label: "Gruvbox Light", appearance: "light" },
  { id: "gruvbox-light-soft", label: "Gruvbox Light Soft", appearance: "light" },
  { id: "horizon-bright", label: "Horizon Bright", appearance: "light" },
  { id: "night-owl-light", label: "Night Owl Light", appearance: "light" },
  { id: "snazzy-light", label: "Snazzy Light", appearance: "light" },
  { id: "solarized-light", label: "Solarized Light", appearance: "light" },
  { id: "slack-ochin", label: "Slack Ochin", appearance: "light" },
  { id: "min-light", label: "Min Light", appearance: "light" },
];

export const THEME_IDS = THEMES.map((t) => t.id);
