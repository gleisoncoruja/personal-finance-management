import { IExpense } from "../../../../interfaces/expenses";
import { IIncome } from "../../../../interfaces/income";
import { convertToNumber } from "../../../../utils/convertToNumber";

export const calculateByCategory = (data: IIncome[] | IExpense[]) => {
  return data.reduce((acc, item) => {
    const category = item.category.name;
    const value = convertToNumber(item.value);
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {} as { [category: string]: number });
};
