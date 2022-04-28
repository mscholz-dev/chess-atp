import React from "react";
import Container from "../layouts/Container.js";

export default function Section({ children, chess, max, large, tinyPadding, stats }) {
  return (
    <section className={`section${chess ? " section-chess" : ""}${max ? " section-max" : ""}${large ? " section-large" : ""}${tinyPadding ? " section-tiny-padding" : ""}`}>
      <Container chess={chess} stats={stats}>
        {children}
      </Container>
    </section>
  );
}
