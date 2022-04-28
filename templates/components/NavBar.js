import React, { useEffect, useRef } from "react";

export default function NavBar({ item, current, handleClick, handleKey }) {
  const navRef = useRef(null);
  const underlineRef = useRef(null);

  const calcUnderline = (index) => {
    if (!navRef.current) return;

    let leftValue = 0;

    // calculate the left value relative to the index of the active anchor
    for (let i = 0; i < index; i++) {
      leftValue += navRef.current.children[i].offsetWidth;
    }

    // add new styles to the underline navbar style
    if (underlineRef.current) {
      underlineRef.current.style.left = `${leftValue}px`;
      underlineRef.current.style.width = `${navRef.current.children[index].offsetWidth}px`;
    }
  };

  useEffect(() => {
    calcUnderline(current);
    window.addEventListener("resize", () => calcUnderline(current));
  });

  return (
    <nav ref={navRef} className="nav-bar">
      {item.map((item, index) => (
        <a key={`nav-bar-${index}`} onClick={() => handleClick(index)} onKeyDown={(e) => handleKey(e, index)} tabIndex={0} className={`nav-bar-item${current === index ? " nav-bar-current" : ""}`}>
          {item}
        </a>
      ))}
      <span ref={underlineRef} className="nav-bar-underline" />
    </nav>
  );
}
