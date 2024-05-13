import React, { useEffect } from "react";
import "../styles/main.scss";
import "regenerator-runtime/runtime";

export default function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    const logoStyle = (logo) => `
      background-image: url(${`data:image/svg+xml;base64,${btoa(logo)}`});
      background-repeat: no-repeat;
      background-size: 32px;
      color: white;
      font-family: sans-serif;
      font-size: 32px;
      padding-left: 42px;
    `;

    const logo1 = await (await fetch(`/mscholzdev/logo-1.svg`)).text();
    console.info("%cCréé par Morgan Scholz avec ❤️", logoStyle(logo1));

    const logo2 = await (await fetch(`/mscholzdev/logo-2.svg`)).text();
    console.info("%chttps://mscholz.dev", logoStyle(logo2));

    const logo3 = await (await fetch(`/mscholzdev/logo-3.svg`)).text();
    console.info("%cmscholz.dev@gmail.com", logoStyle(logo3));
  }, []);

  return <Component {...pageProps} />;
}
