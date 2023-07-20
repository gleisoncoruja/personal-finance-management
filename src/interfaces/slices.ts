import { IExpense } from "./expenses";
import { IIncome } from "./income";

export interface IIncomeSlice {
  incomes: IIncome[];
  error: boolean;
  errorMessage: string;
  success: boolean;
}

export interface IExpenseSlice {
  expenses: IExpense[];
  error: boolean;
  errorMessage: string;
  success: boolean;
}
