import { getMonth, parse } from "date-fns";
import { IMonthsChart } from "../../../interfaces/months";
import { expenseServices } from "../../../services/expenseServices";
import { incomeServices } from "../../../services/incomeServices";
import { convertToNumber } from "../../../utils/convertToNumber";

const months: IMonthsChart[] = [
  { id: 0, name: "Janeiro", totalIncome: 0, totalExpense: 0 },
  { id: 1, name: "Fevereiro", totalIncome: 0, totalExpense: 0 },
  { id: 2, name: "Março", totalIncome: 0, totalExpense: 0 },
  { id: 3, name: "Abril", totalIncome: 0, totalExpense: 0 },
  { id: 4, name: "Maio", totalIncome: 0, totalExpense: 0 },
  { id: 5, name: "Junho", totalIncome: 0, totalExpense: 0 },
  { id: 6, name: "Julho", totalIncome: 0, totalExpense: 0 },
  { id: 7, name: "Agosto", totalIncome: 0, totalExpense: 0 },
  { id: 8, name: "Setembro", totalIncome: 0, totalExpense: 0 },
  { id: 9, name: "Outubro", totalIncome: 0, totalExpense: 0 },
  { id: 10, name: "Novembro", totalIncome: 0, totalExpense: 0 },
  { id: 11, name: "Dezembro", totalIncome: 0, totalExpense: 0 },
];

export const monthsBalance = () => {
  const incomes = incomeServices.getIncomes();
  const expenses = expenseServices.getExpenses();

  incomes?.map((income) => {
    const dateIncome =
      income.date && parse(income.date, "dd/MM/yyyy", new Date());
    const month = dateIncome && getMonth(dateIncome);
    months[month || 0].totalIncome = +convertToNumber(income.value);
  });
  expenses?.map((expense) => {
    const dateIncome =
      expense.date && parse(expense.date, "dd/MM/yyyy", new Date());
    const month = dateIncome && getMonth(dateIncome);
    months[month || 0].totalExpense = +convertToNumber(expense.value);
  });

  return months;
};
