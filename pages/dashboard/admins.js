import React, { useEffect, useState } from "react";
import Section from "../../templates/layouts/Section";
import SearchHeader from "../../templates/components/SearchHeader";
import BoardList from "../../templates/components/BoardList";
import Paging from "../../templates/components/Paging";
import Page from "../../templates/layouts/Page";
import AuthApi from "../api/auth";
import SuperAdminApi from "../api/superadmin";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function DashboardAdmins({ auth, locale, language }) {
  const { t } = useTranslation(["dashboardAdmins", "common"]);

  const router = useRouter();

  const [items, setItems] = useState([]);

  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchHeader, setSearchHeader] = useState("");

  const [count, setCount] = useState(0);

  const handleDelete = async (username) => {
    const res = await SuperAdminApi.adminDelete(username);
    if (res.state) {
      const res2 = await SuperAdminApi.adminsSearch(searchHeader, currentPage);
      if (res2.state) {
        setMaxPage(Math.ceil(res2.count / 10));
        setCount(res2.count);
        setItems(res2.data);
      }
    }
  };

  const handleSearchHeader = async (e) => {
    if (e.key && e.key !== "Enter") return;
    const res = await SuperAdminApi.adminsSearch(searchHeader, 1);
    if (res.state) {
      setMaxPage(Math.ceil(res.count / 10));
      setCount(res.count);
      setItems(res.data);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    if (!auth) router.push("/");
  }, []);

  useEffect(async () => {
    const res = await SuperAdminApi.adminsSearch(searchHeader, currentPage);
    if (res.state) {
      setMaxPage(Math.ceil(res.count / 10));
      setCount(res.count);
      setItems(res.data);
    }
  }, [currentPage]);

  return (
    <Page title={t("dashboardAdmins:metaTitle")} auth={auth} locale={locale} language={language}>
      <Section max>
        <h2 className="section-title">{t("dashboardAdmins:title")}</h2>
        <SearchHeader label={t("dashboardAdmins:searchLabel")} search={searchHeader} setSearch={setSearchHeader} handleSearch={handleSearchHeader} placeholder="" data={[]} />
        <h3 className="section-text">
          {count} {t("common:resultNumberEnd")}
          {count > 1 && "s"}
        </h3>
        <BoardList items={items} handleDelete={handleDelete} />
        <Paging current={currentPage} max={maxPage} setCurrent={setCurrentPage} />
      </Section>
    </Page>
  );
}

export async function getServerSideProps({ locale }) {
  const res = await AuthApi.superAdmin();

  // if not a super admin
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
