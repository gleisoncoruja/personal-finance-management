import { ICategory } from "./category";

export interface IIncome {
  id: number;
  category: ICategory;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}
