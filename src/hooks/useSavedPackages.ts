import { useState, useEffect, useCallback } from "react";
import type { MarketplacePackage } from "@/data/marketplacePackages";

const STORAGE_KEY = "dataharbour_saved_packages";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

function writeSaved(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function useSavedPackages() {
  const [savedIds, setSavedIds] = useState<string[]>(readSaved);

  useEffect(() => {
    writeSaved(savedIds);
  }, [savedIds]);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((v) => v !== id);
      }
      return [...prev, id];
    });
  }, []);

  const removeSave = useCallback((id: string) => {
    setSavedIds((prev) => prev.filter((v) => v !== id));
  }, []);

  return { savedIds, isSaved, toggleSave, removeSave, savedCount: savedIds.length };
}