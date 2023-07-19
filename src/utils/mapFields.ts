export const mapFields = (field: string) => {
  const fields =
    {
      value: "Valor",
      categoryId: "Categoria",
      observation: "Observação",
      date: "Data",
      repeat: "Repetir",
    }[field] || "";

  return fields;
};
