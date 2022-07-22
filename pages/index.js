import React, { useEffect, useState } from "react";
import LinkItem from "../templates/components/LinkItem";
import Page from "../templates/layouts/Page";
import Section from "../templates/layouts/Section";
import AuthApi from "./api/auth";
import IconPlay from "../public/icons/play.svg";
import IconUser from "../public/icons/user.svg";
import ProfileApi from "./api/profile";
import IconGear from "../public/icons/gear.svg";
import IconEdit from "../public/icons/edit.svg";
import IconUserAdd from "../public/icons/user-add.svg";
import IconSignIn from "../public/icons/sign-in.svg";
import useTranslation from "next-translate/useTranslation";

export default function Index({ auth, locale, language }) {
  const { t } = useTranslation("index");

  const [username, setUsername] = useState("");

  useEffect(async () => {
    if (!auth) return;
    // get username
    // const res2 = await ProfileApi.username();
    // if (res2.state) setUsername(res2.username);
  }, []);

  return (
    <Page title={t("index:metaTitle")} auth={auth} locale={locale} language={language}>
      <Section max>
        <h2 className="section-title">{t("index:title")}</h2>
        {auth ? (
          <>
            <LinkItem href="/game" icon={<IconPlay />} title={t("index:gameTitle")} />
            <LinkItem href={`/profile/${username}`} icon={<IconUser />} title={t("index:profileTitle")} />
            <LinkItem href={`/profile/edit/${username}`} icon={<IconEdit />} title={t("index:profileEditTitle")} />
            {(auth === "admin" || auth === "superAdmin") && <LinkItem href="/dashboard" icon={<IconGear />} title={t("index:dashboardTitle")} />}
          </>
        ) : (
          <>
            <LinkItem href="/register" icon={<IconUserAdd />} title={t("index:registerTitle")} />
            <LinkItem href="/login" icon={<IconSignIn />} title={t("index:loginTitle")} />
          </>
        )}
      </Section>
    </Page>
  );
}

// export async function getServerSideProps({ locale }) {
//   const res = await AuthApi.index();
//   console.log("index gssp");
//   console.log(res);
//   if (!res.state)
//     return {
//       props: {
//         auth: false,
//         locale,
//         language: null,
//       },
//     };

//   return {
//     props: {
//       auth: res.role,
//       locale,
//       language: res.language,
//     },
//   };
// }

Index.getInitialProps = async () => {
  const res = await AuthApi.index();

  if (!res.state)
    return {
      props: {
        auth: false,
        locale,
        language: null,
      },
    };

  return {
    props: {
      auth: res.role,
      locale: "fr",
      language: res.language,
    },
  };
};
