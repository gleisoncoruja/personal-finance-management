export const convertToNumber = (formattedNumber: string): number => {
  const numericValue = formattedNumber.replace(/\./g, "").replace(",", ".");

  return parseFloat(numericValue);
};
