import React, { useEffect, useRef } from "react";
import Section from "../../layouts/Section";
import Edito from "../../layouts/Edito.js";

export default function BlockIllu({ imgSrc, imgAlt, children, full, tinyPadding }) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  const handleFull = () => {
    if (imgRef.current) {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      if (winWidth < 1024 && sectionRef.current) {
        const customHeight = winHeight - sectionRef.current.offsetHeight - 70;
        if (customHeight <= 0) return (imgRef.current.style.height = "0px");
        imgRef.current.style.height = `${customHeight}px`;
      } else {
        imgRef.current.style.height = "100vh";
      }
    }
  };

  useEffect(() => {
    if (full) {
      handleFull();
      window.addEventListener("resize", handleFull);
    }
  }, []);

  return (
    <div className={`block-illu${full ? " block-illu-full" : ""}`}>
      <div ref={sectionRef} className="block-illu-content">
        <Section tinyPadding={tinyPadding}>
          <Edito>{children}</Edito>
        </Section>
      </div>
      <div ref={imgRef} className="block-illu-img">
        <img src={imgSrc} alt={imgAlt} className="block-illu-img-tag" />
      </div>
    </div>
  );
}
