import { formatDateTime } from "src/utils/formatDate";

export const getCurrentDate = (): string => {
  return formatDateTime(new Date()).dateToISOString;
};

export const getCurrentDateTimeUnix = (): number => {
  return new Date().getTime();
};

export const convertToDateUnix = (date: Date | string): number => {
  const timestamp = new Date(date);
  timestamp.setUTCHours(0, 0, 0, 0);
  return timestamp.getTime();
};

export const convertToISODateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};
