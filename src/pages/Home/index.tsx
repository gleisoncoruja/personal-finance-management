import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
export const Home = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }

        const data = {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
          datasets: [
            {
              label: "Receitas",
              data: [100, 150, 200, 120, 180],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Despesas",
              data: [80, 120, 160, 90, 150],
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
