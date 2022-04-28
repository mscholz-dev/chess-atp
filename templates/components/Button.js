import React from "react";
import Link from "next/link";

export default function Button({ href, myRef, className, onClick, children }) {
  return (
    <>
      {href ? (
        <Link ref={myRef} href={href} onClick={onClick}>
          <a className={`btn btn-link ${className ? className : ""}`}>{children}</a>
        </Link>
      ) : (
        <button ref={myRef} className={`btn ${className ? className : ""}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}
