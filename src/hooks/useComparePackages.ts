import { useState, useCallback, useRef } from "react";

const MAX_COMPARE = 4;
const STORAGE_KEY = "dataharbour_compare_packages";

function readCompare(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

function writeCompare(ids: string[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Silently fail
  }
}

export function useComparePackages() {
  const [compareIds, setCompareIds] = useState<string[]>(readCompare);
  const toastRef = useRef<string | null>(null);

  const isComparing = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds],
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((v) => v !== id);
        writeCompare(next);
        return next;
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      const next = [...prev, id];
      writeCompare(next);
      return next;
    });
  }, []);

  const removeCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = prev.filter((v) => v !== id);
      writeCompare(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    writeCompare([]);
  }, []);

  return {
    compareIds,
    isComparing,
    toggleCompare,
    removeCompare,
    clearCompare,
    compareCount: compareIds.length,
    maxCompare: MAX_COMPARE,
    isAtLimit: compareIds.length >= MAX_COMPARE,
    toastRef,
  };
}