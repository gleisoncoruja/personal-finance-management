import { ICategory } from "./category";

export interface IIncome {
  id: number;
  category: ICategory;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}

export interface IPostIncomeProps {
  [key: string]: string | number | boolean | null | undefined;
  categoryId: number;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}

export interface IPatchIncomeProps {
  id: number;
  data: IPostIncomeProps;
}
