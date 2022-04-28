import React, { useState, useEffect } from "react";
import IconEye from "../../../public/icons/eye.svg";
import IconEyeSlash from "../../../public/icons/eye-slash.svg";
import IconCheck from "../../../public/icons/check.svg";
import IconCross from "../../../public/icons/cross.svg";

export default function TextInput({ label, type, condition, min, value, setValue, myRef }) {
  const [focus, setFocus] = useState(false);
  const [changeType, setChangeType] = useState(type);
  const [conditionValue, setConditionValue] = useState(false);

  const handleChange = (e) => setValue(e.target.value);

  const handleFocus = () => setFocus(true);

  const handleBlur = () => setFocus(false);

  const handleChangeType = () => setChangeType(changeType === "password" ? "text" : "password");

  useEffect(() => {
    if (value.length >= min) {
      setConditionValue(true);
    } else {
      setConditionValue(false);
    }
  }, [value]);

  return (
    <label ref={myRef} className={`text-input${value.length !== 0 || focus ? " text-input-filled" : ""}${type === "password" ? " text-input-padding" : ""}`}>
      <span className="text-input-label">{label}</span>
      <input type={changeType} className="text-input-input" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={value} />

      {type === "password" && (
        <div className="text-input-password-icon" onClick={handleChangeType}>
          {changeType === "text" ? <IconEye /> : <IconEyeSlash />}
        </div>
      )}

      {condition && (
        <div className="text-input-info">
          <div className="text-input-info-icon">{conditionValue ? <IconCheck /> : <IconCross />}</div>
          <span className="text-input-info-title">{condition}</span>
        </div>
      )}
    </label>
  );
}
