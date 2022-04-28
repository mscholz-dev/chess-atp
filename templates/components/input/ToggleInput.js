import React from "react";

export default function ToggleInput({ text, textChecked, checked, handleChange }) {
  return (
    <label className={`toggle-input${checked ? " toggle-input-checked" : ""}`}>
      <div className="toggle-input-container">
        <input type="checkbox" className="toggle-input-input" checked={checked} onChange={handleChange} />
        <span className="toggle-input-circle" />
      </div>
      {!textChecked && <p className="toggle-input-text">{text}</p>}

      {textChecked && !checked && <p className="toggle-input-text">{text}</p>}
      {textChecked && checked && <p className="toggle-input-text">{textChecked}</p>}
    </label>
  );
}
