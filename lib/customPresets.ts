// User-saved style presets, persisted to localStorage. Kept separate from the
// session-only snippet store so a user's saved looks survive reloads.
//
// SSR-safe: state starts empty (matching the server render) and is hydrated from
// localStorage in an effect after mount — see useHydrateCustomPresets.

import { useEffect } from "react";
import { create } from "zustand";
import type { SnippetSettings } from "./types";

export interface CustomPreset {
  id: string;
  name: string;
  settings: Partial<SnippetSettings>;
  createdAt: number;
}

const KEY = "glaze:custom-presets";

function load(): CustomPreset[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(list: CustomPreset[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Ignore quota / disabled-storage errors — saving is best-effort.
  }
}

function makeId(): string {
  const c = typeof crypto !== "undefined" ? crypto : undefined;
  return c?.randomUUID ? `custom-${c.randomUUID()}` : `custom-${Date.now()}`;
}

interface CustomPresetStore {
  presets: CustomPreset[];
  hydrated: boolean;
  hydrate: () => void;
  /** Save a snapshot under a name; returns the new preset's id. */
  add: (name: string, settings: Partial<SnippetSettings>) => string;
  remove: (id: string) => void;
  rename: (id: string, name: string) => void;
}

export const useCustomPresets = create<CustomPresetStore>((set, get) => ({
  presets: [],
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({ presets: load(), hydrated: true });
  },

  add: (name, settings) => {
    const preset: CustomPreset = {
      id: makeId(),
      name: name.trim() || "Untitled style",
      settings,
      createdAt: Date.now(),
    };
    const next = [preset, ...get().presets];
    persist(next);
    set({ presets: next });
    return preset.id;
  },

  remove: (id) => {
    const next = get().presets.filter((p) => p.id !== id);
    persist(next);
    set({ presets: next });
  },

  rename: (id, name) => {
    const next = get().presets.map((p) =>
      p.id === id ? { ...p, name: name.trim() || p.name } : p,
    );
    persist(next);
    set({ presets: next });
  },
}));

/** Hydrate the store from localStorage once, after mount (client only). */
export function useHydrateCustomPresets() {
  const hydrate = useCustomPresets((s) => s.hydrate);
  useEffect(() => hydrate(), [hydrate]);
}
