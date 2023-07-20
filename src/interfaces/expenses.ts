import { ICategory } from "./category";

export interface IExpense {
  id: number;
  category: ICategory;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}

export interface IPostExpenseProps {
  [key: string]: string | number | boolean | null | undefined;
  categoryId: number;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}

export interface IPatchExpenseProps {
  id: number;
  data: IPostExpenseProps;
}
