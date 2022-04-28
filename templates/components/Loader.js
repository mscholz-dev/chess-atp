import React from "react";
import LoaderIcon from "../../public/icons/loader.svg";

export default function Loader({ displayLoader, waitingTime, playerNumber }) {
  return (
    <div className={`loader${displayLoader ? " loader-display" : ""}${playerNumber === 2 ? " loader-inverse" : ""}`}>
      <div className="loader-wrapper">
        <div className={`loader-icon${displayLoader || waitingTime !== 0 ? " loader-anim" : ""}`}>
          <LoaderIcon />
        </div>
        <p className="loader-title">{waitingTime}</p>
      </div>
    </div>
  );
}
