import "../styles/main.scss";
import "regenerator-runtime/runtime";
import AuthApi from "./api/auth";
import ProfileApi from "./api/profile";

export default function MyApp({ Component, props }) {
  return <Component {...props} />;
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { pathname } = ctx;
  console.log(pathname);

  // index
  if (pathname.includes("/")) {
    const res = await AuthApi.index();

    if (!res.state)
      return {
        props: {
          auth: false,
          locale: ctx.locale,
          language: null,
          username: "",
        },
      };

    const res2 = await ProfileApi.username();

    if (!res2.state)
      return {
        props: {
          auth: res.role,
          locale: ctx.locale,
          language: res.language,
          username: "",
        },
      };

    return {
      props: {
        auth: res.role,
        locale: ctx.locale,
        language: res.language,
        username: res2.username,
      },
    };
  }
};
