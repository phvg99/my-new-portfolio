import type { Locale } from "@/lib/i18n/config";
import { en } from "./en";
import { pt } from "./pt";

/** Canonical dictionary shape — derived from EN so every locale must match it. */
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = { en, pt };
