import { ScriptOnce } from "@tanstack/react-router";
import { createContext, use, useCallback, useEffect, useState } from "react";

import { presetCatalog, presetIds, type PresetId } from "#/config/presets";

type PresetProviderState = {
  preset: PresetId;
  setPreset: (preset: PresetId) => void;
};

const PresetProviderContext = createContext<PresetProviderState | undefined>(undefined);

function getPresetScript(storageKey: string, defaultPreset: PresetId) {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultPreset);
  const allowed = JSON.stringify(presetIds);

  return `(function(){try{var p=localStorage.getItem(${key});var a=${allowed};if(!a.includes(p)){p=${fallback}}document.documentElement.dataset.preset=p}catch(e){document.documentElement.dataset.preset=${fallback}}})();`;
}

function applyPreset(preset: PresetId) {
  document.documentElement.dataset.preset = preset;
}

export function PresetProvider({
  children,
  defaultPreset = presetCatalog.defaultPreset,
  storageKey = "tansail-preset",
}: {
  readonly children: React.ReactNode;
  readonly defaultPreset?: PresetId;
  readonly storageKey?: string;
}) {
  const [preset, setPresetState] = useState(defaultPreset);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const initialPreset =
      presetCatalog.presets.find((item) => item.id === stored)?.id ?? defaultPreset;
    applyPreset(initialPreset);

    const syncState = window.setTimeout(() => {
      setPresetState(initialPreset);
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(syncState);
  }, [defaultPreset, storageKey]);

  useEffect(() => {
    if (mounted) applyPreset(preset);
  }, [mounted, preset]);

  const setPreset = useCallback(
    (nextPreset: PresetId) => {
      localStorage.setItem(storageKey, nextPreset);
      setPresetState(nextPreset);
    },
    [storageKey],
  );

  return (
    <PresetProviderContext value={{ preset, setPreset }}>
      <ScriptOnce>{getPresetScript(storageKey, defaultPreset)}</ScriptOnce>
      {children}
    </PresetProviderContext>
  );
}

export function usePreset() {
  const context = use(PresetProviderContext);
  if (!context) throw new Error("usePreset must be used within a PresetProvider");
  return context;
}
