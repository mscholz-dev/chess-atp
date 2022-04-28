import React, { useState, useEffect } from "react";
import Button from "../templates/components/Button";
import Page from "../templates/layouts/Page.js";
import AuthApi from "./api/auth";
import useTranslation from "next-translate/useTranslation";

export default function NotFound() {
  const { t } = useTranslation("404");

  const [auth, setAuth] = useState(false);
  const [language, setLanguage] = useState(null);

  // is auth
  useEffect(async () => {
    const res = await AuthApi.index();
    // no connected
    if (!res.state) return;

    setAuth(res.role);
    setLanguage(res.language);
  }, []);

  return (
    <Page title={t("404:metaTitle")} auth={auth} language={language}>
      <section className="not-found">
        <div>
          <h1 className="not-found-title">{t("404:title")}</h1>
          <p className="not-found-text">{t("404:text")}</p>
          <Button href="/" className="btn btn-primary btn-large">
            <span>{t("404:btnTitle")}</span>
          </Button>
        </div>
      </section>
    </Page>
  );
}
