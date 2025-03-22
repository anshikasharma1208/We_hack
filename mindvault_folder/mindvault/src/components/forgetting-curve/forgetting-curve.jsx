import React from "react";
import Plot from "react-plotly.js";

const ForgettingCurveGraph = () => {
  return (
    <Plot
      data={[
        {
          marker: { color: "#DE497F", opacity: 0.7, size: 10 },
          mode: "markers",
          name: "Actual Performance",
          x: [3, 4, 7, 8, 9, 8, 2, 1, 3, 3, 4, 7, 8, 9, 8],
          y: [100, 80, 60, 90, 50, 30, 70, 40, 20, 100, 80, 60, 90, 50, 30],
          type: "scatter",
        },
        {
          line: { color: "#436CD8", dash: "dash", width: 4 },
          mode: "lines",
          name: "Predicted Forgetting Curve",
          x: Array.from({ length: 30 }, (_, i) => i),
          y: [
            72.53, 70.89, 69.25, 67.6, 65.96, 64.32, 62.68, 61.03, 59.39, 57.75,
            56.11, 54.46, 52.82, 51.18, 49.54, 47.9, 46.25, 44.61, 42.97, 41.33,
            39.68, 38.04, 36.4, 34.76, 33.11, 31.47, 29.83, 28.19, 26.55, 24.9,
          ],
          type: "scatter",
        },
      ]}
      layout={{
        title: "Actual Performance vs Predicted Forgetting Curve",
        xaxis: { title: "Days" },
        yaxis: { title: "Retention (%)" },
        responsive: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ForgettingCurveGraph;
