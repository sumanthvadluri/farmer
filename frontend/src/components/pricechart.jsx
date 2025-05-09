import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../styles.css"; // Import external CSS

Chart.register(ArcElement, Tooltip, Legend);

const CropPriceChart = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [chartData, setChartData] = useState({});

  // 🌾 Crop price dataset (prices for each month in 2025)
  const cropPrices = {
    wheat: [3036.33, 2994.66, 2845.22],
    rice: [3761.34, 3779.27, 3775.14],
    corn: [200, 1000, 2000],
    sugarcane: [4340.51, 4229.93, 4865.76],
    maize: [2448.22, 2414.46, 2402.98],
  };

  // 🌍 Month Labels
  const monthLabels = ["Jan", "Feb", "Mar"];

  // 🎨 Chart Colors
  const chartColors = ["#FF5733", "#33FF57", "#3357FF"];

  // 📊 Update chart data when crop changes
  useEffect(() => {
    setChartData({
      labels: monthLabels,
      datasets: [
        {
          data: cropPrices[selectedCrop],
          backgroundColor: chartColors,
        },
      ],
    });
  }, [selectedCrop]);

  return (
    <div className="crop-price-container">
      <h2>Crop Price Pie Chart - 2025</h2>
      <label htmlFor="cropSelect" className="crop-select-label">
        Select a Crop:
      </label>
      <select
        id="cropSelect"
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
        className="crop-select"
      >
        <option value="wheat">Wheat</option>
        <option value="rice">Rice</option>
        <option value="corn">Corn</option>
        <option value="sugarcane">Sugarcane</option>
        <option value="maize">Maize</option>
      </select>
      <div className="chart-container">
        {chartData.labels ? <Pie data={chartData} /> : <p>Loading chart...</p>}
      </div>
    </div>
  );
};

export default CropPriceChart;
