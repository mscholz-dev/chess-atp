import React, { useState, useEffect } from "react";
import BoardList from "../../templates/components/BoardList";
import Page from "../../templates/layouts/Page";
import Section from "../../templates/layouts/Section";
import AuthApi from "../api/auth";
import AdminApi from "../api/admin";
import SearchHeader from "../../templates/components/SearchHeader";
import Paging from "../../templates/components/Paging";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function DashboardUsers({ locale }) {
  const { t } = useTranslation(["dashboardUsers", "common"]);

  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [lang, setLang] = useState(null);

  const [items, setItems] = useState([]);

  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchHeader, setSearchHeader] = useState("");

  const [count, setCount] = useState(0);

  const handleDelete = async (username) => {
    const res = await AdminApi.userDelete(username);
    if (res.state) {
      const res2 = await AdminApi.usersSearch(searchHeader, currentPage);
      if (res2.state) {
        setMaxPage(Math.ceil(res2.count / 10));
        setCount(res2.count);
        setItems(res2.data);
      }
    }
  };

  const handleSearchHeader = async (e) => {
    if (e.key && e.key !== "Enter") return;
    const res = await AdminApi.usersSearch(searchHeader, 1);
    if (res.state) {
      setMaxPage(Math.ceil(res.count / 10));
      setCount(res.count);
      setItems(res.data);
      setCurrentPage(1);
    }
  };

  useEffect(async () => {
    // get auth
    const res = await AuthApi.admin();
    if (!res.state) return router.push("/");

    setAuth(res.role);
    setLang(res.lang);
  }, []);

  useEffect(async () => {
    const res = await AdminApi.usersSearch(searchHeader, currentPage);
    if (res.state) {
      setMaxPage(Math.ceil(res.count / 10));
      setCount(res.count);
      setItems(res.data);
    }
  }, [currentPage]);

  return (
    <Page title={t("dashboardUsers:metaTitle")} auth={auth} locale={locale} language={lang}>
      <Section max>
        <h2 className="section-title">{t("dashboardUsers:title")}</h2>
        <SearchHeader label={t("dashboardUsers:searchLabel")} search={searchHeader} setSearch={setSearchHeader} handleSearch={handleSearchHeader} placeholder="" data={[]} />
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
  return { props: { locale } };
}
