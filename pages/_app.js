// import "../styles/main.scss";
// import "regenerator-runtime/runtime";

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import "../styles/main.scss";
import App from "next/app";
import AuthApi from "./api/auth";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

// MyApp.getInitialProps = async (ctx) => {
//   // include dashboard
//   const appProps = await App.getInitialProps(ctx);
//   // console.log(ctx);
//   const test = await AuthApi.index();
//   // console.log(test);

//   return { ...appProps };
// };
