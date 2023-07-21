import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getExpenses } from "../../../../redux/slices/expenseSlice";
import { calculateByCategory } from "../utils/calculateByCategory";

export const ExpenseCategoryChart = () => {
  const dispatch = useAppDispatch();
  const { expenses } = useAppSelector((state) => state.expense);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const expenseData = calculateByCategory(expenses);

  useEffect(() => {
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
          labels: Object.keys(expenseData),
          datasets: [
            {
              label: "Despesas por categoria",
              data: Object.values(expenseData),
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
  }, [expenses]);
  return <canvas ref={chartRef} />;
};
