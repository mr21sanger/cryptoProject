import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register components including TimeScale for time-based data
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function CryptoChart({ data, days }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  // Format data with timestamps as Date objects
  const formattedData = data.map((point) => ({
    x: new Date(point[0]), // Ensure x is a Date object for time scale
    y: point[1],
  }));

  // Determine if the price is increasing or decreasing
  const isIncreasing = formattedData[formattedData.length - 1].y > formattedData[0].y;
  const lineColor = isIncreasing ? "#00FF00" : "#FF0000"; // Green if increasing, red if decreasing
  const backgroundColor = isIncreasing ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"; // Slightly transparent background

  // Define the chart data
  const chartData = {
    datasets: [
      {
        data: formattedData,
        label: `Price (Past ${days} Days) in USD`,
        borderColor: lineColor, // Dynamic line color
        backgroundColor: backgroundColor, // Dynamic shadow color
        borderWidth: 2,
        fill: "start", // Fill from the line to the bottom of the chart, creating a shadow effect
        tension: 0.4, // Smooth line
        pointBackgroundColor: lineColor,
        pointRadius: 0.5  , // Small point radius
        pointHoverRadius: 5, // Larger on hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#FFFFFF", // White legend text color
        },
        position: "top", // Adjusted to prevent overlap
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Price: $${context.parsed.y.toFixed(2)}`; // Display with two decimal places
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: days === "1" ? "hour" : "day",
          displayFormats: {
            hour: "MMM dd, h:mm a", // Improved display format
            day: "MMM dd", // Show month and day
          },
        },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines for visibility
        },
        title: {
          display: true,
          text: "Time",
          color: "#FFFFFF", // White axis label
        },
        ticks: {
          color: "#FFFFFF", // White axis tick labels
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
          color: "#FFFFFF", // White axis label
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines
        },
        ticks: {
          color: "#FFFFFF", // White axis tick labels
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "50vh" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default CryptoChart;
