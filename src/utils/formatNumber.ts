import * as Localization from "expo-localization";

/**
 * Formats a number with region-specific thousand separators and decimal places
 * @param value - The number to format
 * @param decimals - Optional number of decimal places (default: 0 for whole numbers)
 * @returns Formatted number string with thousand separators
 * @example
 * formatNumber(5000) // Returns "5,000" for en-US, "5.000" for de-DE, "5 000" for fr-FR
 * formatNumber(5000.5, 2) // Returns "5,000.50" for en-US
 */
export const formatNumber = (
  value: number | null | undefined,
  decimals: number = 0
): string => {
  // Handle edge cases
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  try {
    // Get user's locale from device settings
    const locale = Localization.getLocales()[0]?.languageTag || "en-US";

    // Create number formatter with region-specific settings
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(value);
  } catch (error) {
    // Fallback to basic formatting if Intl fails
    console.warn("Number formatting failed, using fallback:", error);
    return value.toFixed(decimals);
  }
};