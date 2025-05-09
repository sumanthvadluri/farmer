import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from "chart.js";
import "../styles.css";

Chart.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

const RainfallChart = () => {
  // 🌧️ Monthly Rainfall Data (in mm) for 2025
  const rainfallData = [120, 90, 85, 110, 150];

  // 🌍 Month Labels
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May"];

  // 📊 Chart Data
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Rainfall (mm)",
        data: rainfallData,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "#007bff",
      },
    ],
  };

  // 🛠 Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="rainfall-chart-container">
      <h2>Rainfall Data - 2025</h2>
      <br/>
      <br/>
      <Line data={data} options={options} />
    </div>
  );
};

export default RainfallChart;
