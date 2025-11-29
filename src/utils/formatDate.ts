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

export const formatDateTime = (date: Date | string) => {
  const locale = getDateFnsLocale();

  const formatDateMonth = format(new Date(date), "d MMM");

  const formatIntlDate = format(new Date(date), "P", { locale });

  const formatShortDateWithYear = format(new Date(date), "d MMM yyyy");

  const formatDateToISOString = format(new Date(date), "yyyy-MM-dd");

  return {
    dateMonthForRange: formatDateMonth,
    intlDateFormat: formatIntlDate,
    shortDateWithYear: formatShortDateWithYear,
    dateToISOString: formatDateToISOString,
  };
};
