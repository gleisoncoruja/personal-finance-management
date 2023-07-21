import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getIncomes } from "../../../../redux/slices/incomeSlice";
import { calculateByCategory } from "../utils/calculateByCategory";

export const IncomeCategoryChart = () => {
  const dispatch = useAppDispatch();
  const { incomes } = useAppSelector((state) => state.income);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const incomeData = calculateByCategory(incomes);

  useEffect(() => {
    dispatch(getIncomes());
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
          labels: Object.keys(incomeData),
          datasets: [
            {
              label: "Receitas por categoria",
              data: Object.values(incomeData),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
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
  }, [incomes]);
  return <canvas ref={chartRef} />;
};
