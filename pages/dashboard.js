import React, { useEffect, useState } from "react";
import Page from "../templates/layouts/Page";
import AuthApi from "./api/auth";
import Section from "../templates/layouts/Section";
import LinkItem from "../templates/components/LinkItem";
import IconUser from "../public/icons/user.svg";
import { useRouter } from "next/router";
import IconChartLine from "../public/icons/chart-line.svg";
import IconUserAdd from "../public/icons/user-add.svg";
import useTranslation from "next-translate/useTranslation";

export default function Dashboard({ locale }) {
  const { t } = useTranslation("dashboard");

  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [lang, setLang] = useState(null);

  useEffect(async () => {
    // get auth
    const res = await AuthApi.admin();
    if (!res.state) return router.push("/");

    setAuth(res.role);
    setLang(res.lang);
  }, []);

  return (
    <Page title={t("dashboard:metaTitle")} auth={auth} locale={locale} language={lang}>
      <Section max>
        <h2 className="section-title">{t("dashboard:title")}</h2>
        <LinkItem href="/dashboard/users" icon={<IconUser />} title={t("dashboard:usersManagement")} />
        {auth === "superAdmin" && (
          <>
            <LinkItem href="/dashboard/create/admin" icon={<IconUserAdd />} title={t("dashboard:createAdmin")} />
            <LinkItem href="/dashboard/admins" icon={<IconUser />} title={t("dashboard:adminsManagement")} />
            <LinkItem href="/dashboard/statistics" icon={<IconChartLine />} title={t("dashboard:statistics")} />
          </>
        )}
      </Section>
    </Page>
  );
}

export async function getServerSideProps({ locale }) {
  return { props: { locale } };
}
