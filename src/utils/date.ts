import { formatDateTime } from "src/utils/formatDate";

export const getCurrentDate = (): string => {
  return formatDateTime(new Date()).dateToISOString;
};
