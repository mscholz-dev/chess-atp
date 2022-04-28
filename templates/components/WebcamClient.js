import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Draggable from "react-draggable";
import IconVideo from "../../public/icons/video.svg";
import IconVideoSlash from "../../public/icons/video-slash.svg";

export default function WebcamClient({ displayWebcam, setDisplayWebcam, handleClickWebcam }) {
  const webcamMainRef = useRef(null);
  const webcamRef = useRef(null);

  const handleWebcamWidth = () => {
    const webcamW = webcamRef.current.video.offsetWidth;

    // is default webcam component value
    if (webcamW === 300) return setTimeout(handleWebcamWidth, 50);

    const webcamH = webcamRef.current.video.offsetHeight;
    const ratio = webcamW / webcamH;
    const newW = 150;

    // webcam init size
    webcamRef.current.video.style.width = `${newW}px`;
    webcamRef.current.video.style.height = `${newW / ratio}px`;

    // webcam init pos
    webcamMainRef.current.style.bottom = "150px";
    webcamMainRef.current.style.left = "24px";

    // smooth webcam's display
    webcamMainRef.current.style.opacity = "1";

    setDisplayWebcam(true);
  };

  // when webcam component is ready
  useEffect(() => {
    if (!displayWebcam) return;
    handleWebcamWidth();
  }, [webcamRef.current, displayWebcam]);

  return (
    <>
      <button onClick={handleClickWebcam} className={`btn-utils btn-webcam${displayWebcam ? " btn-utils-active" : ""}`}>
        {displayWebcam ? <IconVideo /> : <IconVideoSlash />}
      </button>

      {displayWebcam && (
        <div ref={webcamMainRef} className={`webcam-client-main`}>
          <Draggable>
            <div className="webcam-client-overlay">
              <div className="webcam-client-overlay-inner">
                <Webcam ref={webcamRef} mirrored />
              </div>
            </div>
          </Draggable>
        </div>
      )}
    </>
  );
}
