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

export default function Index({ locale }) {
  const { t } = useTranslation("index");

  const [auth, setAuth] = useState(false);
  const [lang, setLang] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(async () => {
    // get auth
    const res = await AuthApi.index();
    alert(res.state, res.role, res.language);
    if (!res.state) return;

    setAuth(res.role);
    setLang(res.lang);

    // get username
    const res2 = await ProfileApi.username();
    if (!res2.state) return;

    setUsername(res2.username);
  }, []);

  return (
    <Page title={t("index:metaTitle")} auth={auth} locale={locale} language={lang}>
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

export async function getServerSideProps({ locale }) {
  return { props: { locale } };
}
