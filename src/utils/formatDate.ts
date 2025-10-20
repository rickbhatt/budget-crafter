import { fnsLoacales } from "@/constants";
import type { Locale } from "date-fns";
import { format } from "date-fns";
import { getLocales } from "expo-localization";

const getDateFnsLocale = (): Locale => {
  const deviceLocale = getLocales()[0];

  return (
    fnsLoacales[deviceLocale.languageTag] ||
    fnsLoacales[deviceLocale?.languageCode!] ||
    "enUs"
  );
};

export const formatDateTime = (date: Date | number) => {
  const formatDateMonth = format(new Date(date), "d MMM");

  const locale = getDateFnsLocale();

  const formatIntlDate = format(new Date(date), "P", { locale });

  return {
    dateMonthForRange: formatDateMonth,
    intlDateFormat: formatIntlDate,
  };
};
