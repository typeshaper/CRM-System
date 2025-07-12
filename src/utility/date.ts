export const formatDateFromIsoString = (isoDateString: string) => {
  const date = isoDateString.slice(0, 10);
  return date.split("-").reverse().join(".");
};
