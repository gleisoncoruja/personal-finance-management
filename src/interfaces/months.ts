export interface IMonths {
  id: number;
  name: string;
}

export interface IMonthsChart {
  id: number;
  name: string;
  totalIncome: number;
  totalExpense: number;
}

export interface IMonthsState {
  months: IMonthsChart[];
  balanceIncome: number;
  balanceExpense: number;
  balance: number;
}
