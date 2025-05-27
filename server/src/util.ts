/** Formats date as YYYY-MM-DD as a string */
export const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};
