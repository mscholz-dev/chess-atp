import React from "react";
import IconMicro from "../../public/icons/microphone.svg";
import IconMicroSlash from "../../public/icons/microphone-slash.svg";

export default function BtnSpeech({ handleClickSpeech, listening }) {
  return (
    <button onClick={handleClickSpeech} className={`btn-utils btn-speech${listening ? " btn-utils-active" : ""}`}>
      {listening ? <IconMicro /> : <IconMicroSlash />}
    </button>
  );
}
