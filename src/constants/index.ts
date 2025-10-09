import type { Locale } from "date-fns";
import { de, enGB, enIN, enUS, es, fr, it, pt } from "date-fns/locale";
const fnsLoacales: { [key: string]: Locale } = {
  "en-US": enUS,
  "en-GB": enGB,
  "en-IN": enIN,
  de: de,
  "de-DE": de,
  fr: fr,
  es: es,
  it: it,
  pt: pt,
  // Add more as needed
};

export { fnsLoacales };
