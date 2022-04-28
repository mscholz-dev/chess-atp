import React from "react";

export default function ChartWrapper({ children, title }) {
  return (
    <div className="chart-wrapper">
      <h3 className="chart-wrapper-title">{title}</h3>
      {children}
    </div>
  );
}
