import React from "react";

export default function ChessNav({ item, current, setCurrent }) {
  const handleClickItem = (index) => setCurrent(index);

  const handleKeyItem = (e, index) => e.key === "Enter" && setCurrent(index);

  return (
    <nav className="chess-nav">
      {item.map((item, index) => {
        return (
          <div key={`chess-nav-${index}`} className={`chess-nav-item${index === current ? " chess-nav-item-current" : ""}`} onClick={() => handleClickItem(index)} onKeyDown={(e) => handleKeyItem(e, index)} tabIndex={0}>
            <div className="chess-nav-item-icon">{item.icon}</div>
            <span className="chess-nav-item-title">{item.title}</span>
          </div>
        );
      })}
    </nav>
  );
}
