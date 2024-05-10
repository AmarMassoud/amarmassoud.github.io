import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function SalesChart() {
  const chartRef = useRef(null);
  const barchartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    barchartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of sales",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        backgroundColor: "#F20E0F",
        borderRadius: 10,
      },
    });

    return () => {
      if (barchartRef.current) {
        barchartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} id="barchart" />
    </div>
  );
}

export default SalesChart;
