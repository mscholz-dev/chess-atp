import React, { useEffect } from "react";
import Page from "../templates/layouts/Page";
import AuthApi from "./api/auth";
import Section from "../templates/layouts/Section";
import LinkItem from "../templates/components/LinkItem";
import IconUser from "../public/icons/user.svg";
import { useRouter } from "next/router";
import IconChartLine from "../public/icons/chart-line.svg";
import IconUserAdd from "../public/icons/user-add.svg";
import useTranslation from "next-translate/useTranslation";

export default function Dashboard({ auth, locale, language }) {
  const { t } = useTranslation("dashboard");

  const router = useRouter();

  useEffect(() => {
    if (!auth) router.push("/");
  }, []);

  return (
    <Page title={t("dashboard:metaTitle")} auth={auth} locale={locale} language={language}>
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
  const res = await AuthApi.admin();

  // if not an admin
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
