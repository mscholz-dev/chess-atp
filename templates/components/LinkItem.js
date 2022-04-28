import React from "react";
import Link from "next/link";

export default function LinkItem({ href, icon, title }) {
  return (
    <Link href={href}>
      <a className="link-item">
        <div className="link-item-icon">{icon}</div>
        <span className="link-item-title">{title}</span>
      </a>
    </Link>
  );
}
