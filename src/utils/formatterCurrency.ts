export const formatCurrency = (value: string): string => {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return ""; // Retornar uma string vazia caso o valor não seja um número válido
  }

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return numericValue.toLocaleString("pt-BR", options).replace("R$", "");
};
