import React, { useEffect, useRef } from "react";
import IconInfo from "../../public/icons/info.svg";
import IconAlert from "../../public/icons/alert.svg";
import IconValid from "../../public/icons/check.svg";
import IconCross from "../../public/icons/cross.svg";

export default function Toast({ display, event, title, text, handleClick }) {
  const toastRef = useRef(null);

  const handlePosition = () =>
    !display
      ? (toastRef.current.style.top = `-${toastRef.current.offsetHeight}px`)
      : (toastRef.current.style.top = "64px");

  useEffect(() => {
    handlePosition();
  }, []);

  useEffect(() => {
    handlePosition();
  }, [display]);

  return (
    <div
      ref={toastRef}
      className={`toast${event ? ` toast-${event}` : ""}`}
      onClick={handleClick}
    >
      <div className="toast-icon">
        {event === "info" && <IconInfo />}
        {event === "alert" && <IconAlert />}
        {event === "valid" && <IconValid />}
      </div>
      <div className="toast-content">
        <h2 className="toast-title">{title}</h2>
        <p className="toast-text">{text}</p>
      </div>
      <div className="toast-action">
        <IconCross />
      </div>
    </div>
  );
}
