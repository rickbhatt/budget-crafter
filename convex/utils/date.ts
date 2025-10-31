/**
 * Date utility functions for Convex backend
 * These functions don't depend on React Native or frontend libraries
 */

/**
 * Returns the current date in ISO string format (YYYY-MM-DD)
 */
export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

/**
 * Returns the current date and time as Unix timestamp in milliseconds
 */
export const getCurrentDateTimeUnix = (): number => {
  return Date.now();
};

/**
 * Converts a date to Unix timestamp (milliseconds) at midnight UTC
 */
export const convertToDateUnix = (date: Date | string): number => {
  const timestamp = new Date(date);
  timestamp.setUTCHours(0, 0, 0, 0);
  return timestamp.getTime();
};

/**
 * Converts a Date object to ISO date string (YYYY-MM-DD)
 */
export const convertToISODateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
