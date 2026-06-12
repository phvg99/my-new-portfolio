"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";

/* ------------------------------------------------------------------ *
 * Locale is persisted in localStorage and read via useSyncExternalStore
 * so SSR/hydration is consistent (server snapshot = DEFAULT_LOCALE) and
 * the stored preference is adopted right after hydration. Changes notify
 * all subscribers and propagate across tabs via the `storage` event.
 * ------------------------------------------------------------------ */

let cachedLocale: Locale | null = null;
const listeners = new Set<() => void>();

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

function getSnapshot(): Locale {
  if (cachedLocale === null) {
    cachedLocale = readStoredLocale();
  }
  return cachedLocale;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cachedLocale = isLocale(event.newValue) ? event.newValue : DEFAULT_LOCALE;
      listeners.forEach((listener) => listener());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function writeLocale(next: Locale): void {
  cachedLocale = next;
  localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Keep <html lang> in sync with the active locale (DOM is an external system).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    writeLocale(next);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook returning the active dictionary directly. */
export function useTranslation() {
  return useLanguage().t;
}
