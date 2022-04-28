import React, { useEffect, useRef } from "react";

export default function Stopwatch({ needle }) {
  const needleRef = useRef(null);

  useEffect(() => {
    needleRef.current.style.transform = `translate(-50%, -50%) rotate(${
      needle * 90 - 90
    }deg)`;
  }, [needle]);

  return (
    <div className="stopwatch">
      <span ref={needleRef} className="stopwatch-needle" />
    </div>
  );
}
