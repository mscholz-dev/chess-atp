import React from "react";
import LinkItem from "../templates/components/LinkItem";
import Page from "../templates/layouts/Page";
import Section from "../templates/layouts/Section";
import IconPlay from "../public/icons/play.svg";
import IconUser from "../public/icons/user.svg";
import IconGear from "../public/icons/gear.svg";
import IconEdit from "../public/icons/edit.svg";
import IconUserAdd from "../public/icons/user-add.svg";
import IconSignIn from "../public/icons/sign-in.svg";
import useTranslation from "next-translate/useTranslation";

export default function Index({ auth, locale, language, username }) {
  const { t } = useTranslation("index");

  console.log(auth, locale, language, username);

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
