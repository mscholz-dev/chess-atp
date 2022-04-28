import React from "react";

export default function ChartLegend({ text, color, bar }) {
  return (
    <div className={`chart-legend${bar ? " chart-legend-bar" : ""}`}>
      <span className="chart-legend-cartridge" style={{ background: color }} />
      <p className="chart-legend-text">{text}</p>
    </div>
  );
}
