import React from "react";
import Edito from "../templates/layouts/Edito";
import Page from "../templates/layouts/Page";
import Section from "../templates/layouts/Section";
import AuthApi from "./api/auth";
import useTranslation from "next-translate/useTranslation";

export default function LegalNotice({ auth, locale, language }) {
  const { t } = useTranslation("legalNotice");

  return (
    <Page title={t("metaTitle")} auth={auth} locale={locale} language={language}>
      <Section>
        <Edito>
          <h2>{t("legalNotice:title")}</h2>
          <h3>{t("legalNotice:cookieTitle")}</h3>
          <p>{t("legalNotice:cookieLineOne")}</p>
          <p>{t("legalNotice:cookieLineTwo")}</p>
          <h3>{t("legalNotice:ipTitle")}</h3>
          <p>{t("legalNotice:ipLineOne")}</p>
          <p>{t("legalNotice:ipLineTwo")}</p>
        </Edito>
      </Section>
    </Page>
  );
}

export async function getServerSideProps({ locale }) {
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
      locale,
      language: res.language,
    },
  };
}
