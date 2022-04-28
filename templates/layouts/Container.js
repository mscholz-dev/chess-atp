import React from "react";

export default function Container({ children, chess, stats }) {
  return <div className={`container${chess ? " container-chess" : ""}${stats ? " container-stats" : ""}`}>{children}</div>;
}
