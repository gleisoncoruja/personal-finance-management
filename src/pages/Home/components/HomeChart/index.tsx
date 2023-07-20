import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getIncomes } from "../../../../redux/slices/incomeSlice";
import { getExpenses } from "../../../../redux/slices/expenseSlice";
import { IMonthsChart } from "../../../../interfaces/months";
import { getMonth, parse } from "date-fns";
import { convertToNumber } from "../../../../utils/convertToNumber";

export const HomeChart = () => {
  const dispatch = useAppDispatch();
  const { incomes } = useAppSelector((state) => state.income);
  const { expenses } = useAppSelector((state) => state.expense);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const months = useMemo(() => {
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

    incomes?.map((income) => {
      const dateIncome =
        income.date && parse(income.date, "dd/MM/yyyy", new Date());
      const month = dateIncome && getMonth(dateIncome);
      const monthValue = months[month || 0].totalIncome;
      months[month || 0].totalIncome =
        monthValue + convertToNumber(income.value);
    });
    expenses?.map((expense) => {
      const dateIncome =
        expense.date && parse(expense.date, "dd/MM/yyyy", new Date());
      const month = dateIncome && getMonth(dateIncome);
      const monthValue = months[month || 0].totalExpense;
      months[month || 0].totalExpense =
        monthValue + convertToNumber(expense.value);
    });
    return months;
  }, [incomes, expenses]);

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getExpenses());
  }, []);

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
            {
              label: "Saldo",
              data: months.map(
                ({ totalIncome, totalExpense }) => totalIncome - totalExpense
              ),
              backgroundColor: "rgba(67, 76, 194, 0.5)",
              borderColor: "rgba(67, 76, 194, 1)",
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
  }, [months]);
  return <canvas ref={chartRef} />;
};
