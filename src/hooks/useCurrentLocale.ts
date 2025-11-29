import { useLocales } from "expo-localization";

export const useCurrentLocale = () => {
  const locales = useLocales();
  return locales[0];
};
