export const formatDate = (date: Date | string | undefined): string => {
  if (!date) {
    return "N/A";
  }
  return new Date(date).toLocaleDateString();
};
