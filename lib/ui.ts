// Lightweight UI/view state — kept separate from the snippet settings store so
// it stays out of reset() and is never captured by an export.

import { create } from "zustand";

export type StudioTab = "styles" | "themes" | "fonts" | "backgrounds";

export const ZOOM_MIN = 0.25;
export const ZOOM_MAX = 3;

function clampZoom(z: number): number {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 100) / 100));
}

interface UIStore {
  // Studio modal
  studioOpen: boolean;
  studioTab: StudioTab;
  openStudio: (tab?: StudioTab) => void;
  closeStudio: () => void;

  // Canvas view zoom (independent of export resolution)
  zoom: number;
  setZoom: (z: number) => void;
  resetZoom: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  studioOpen: false,
  studioTab: "styles",
  openStudio: (tab) =>
    set((s) => ({ studioOpen: true, studioTab: tab ?? s.studioTab })),
  closeStudio: () => set({ studioOpen: false }),

  zoom: 1,
  setZoom: (z) => set({ zoom: clampZoom(z) }),
  resetZoom: () => set({ zoom: 1 }),
}));
