import { ICategory } from "./category";

export interface IExpense {
  id: number;
  category: ICategory;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}
