export const getCurrentDateUnix = (): number => {
  const timestamp = new Date();
  timestamp.setHours(0, 0, 0, 0);
  return timestamp.getTime();
};

export const getCurrentDateTimeUnix = (): number => {
  return new Date().getTime();
};

export const convertToDateUnix = (date: Date | string): number => {
  const timestamp = new Date(date);
  timestamp.setHours(0, 0, 0, 0);
  return timestamp.getTime();
};
