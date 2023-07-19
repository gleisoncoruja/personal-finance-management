import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { IMonthsChart } from "../../interfaces/months";
import { incomeServices } from "../../services/incomeServices";
import { getMonth, parse } from "date-fns";
import { expenseServices } from "../../services/expenseServices";

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
export const Home = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const incomes = incomeServices.getIncomes();
  const expenses = expenseServices.getExpenses();
  incomes?.map((income) => {
    const dateIncome =
      income.date && parse(income.date, "dd/MM/yyyy", new Date());
    const month = dateIncome && getMonth(dateIncome);
    months[month || 0].totalIncome = +income.value;
  });
  expenses?.map((expense) => {
    const dateIncome =
      expense.date && parse(expense.date, "dd/MM/yyyy", new Date());
    const month = dateIncome && getMonth(dateIncome);
    months[month || 0].totalExpense = +expense.value;
  });
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }

        const data = {
          labels: months.map(({ name }) => name),
          datasets: [
            {
              label: "Receitas",
              data: months.map(({ totalIncome }) => totalIncome),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Despesas",
              data: months.map(({ totalExpense }) => totalExpense),
              backgroundColor: "rgba(192, 75, 75, 0.5)",
              borderColor: "rgba(192, 75, 75, 1)",
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
        };

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data,
          options,
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
};
