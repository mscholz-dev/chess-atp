import React, { useState, useEffect } from "react";
import Profile from "../../templates/components/profile/Profile";
import Page from "../../templates/layouts/Page";
import AuthApi from "../api/auth";
import ProfileApi from "../api/profile";
import Section from "../../templates/layouts/Section";
import ProfileTemplate from "../../templates/components/profile/ProfileTemplate";
import { convertDatetimeInDate, convertDatetimeInTimeSpent, returnSevenLastDay } from "../../utils/date";
import SearchHeader from "../../templates/components/SearchHeader";
import ChartWrapper from "../../templates/components/chart/ChartWrapper";
import ChartLegend from "../../templates/components/chart/ChartLegend";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { color } from "../../utils/color";
import useTranslation from "next-translate/useTranslation";

export default function Profil({ data, locale }) {
  const { t } = useTranslation("profile");

  const dayLabel = returnSevenLastDay(false, locale);

  const [auth, setAuth] = useState(false);
  const [lang, setLang] = useState(null);

  const [currentNav, setCurrentNav] = useState(0);

  const [searchHeader, setSearchHeader] = useState("");
  const [searchHeaderData, setSearchHeaderData] = useState([]);

  const [gamesData, setGamesData] = useState(null);

  // graph options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: color.tertiaryColorDark,
        borderColor: color.white,
        borderWidth: 1,
        padding: 8,
        cornerRadius: 5,
        titleFont: {
          weight: "normal",
        },
      },
    },
    hover: {
      mode: "label",
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 10,
        grid: {
          color: color.greyTransparent,
        },
        ticks: {
          color: color.white,
          font: {
            size: 14,
          },
        },
      },
      x: {
        grid: {
          color: color.greyTransparent,
        },
        ticks: {
          color: color.white,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const handleSearchHeader = async (e) => {
    if (e.key && e.key !== "Enter") return;
    const res = await ProfileApi.search({ username: searchHeader });
    if (res.state) setSearchHeaderData(res.data);
  };

  useEffect(async () => {
    const res = await ProfileApi.statsGamesNumber({ username: data.username });
    if (res.state) {
      const daysId = returnSevenLastDay(true, locale);
      const datas = res.data;
      const total = [];
      const winA = [];
      const equalityA = [];
      const looseA = [];

      // for each day
      for (const dayId of daysId) {
        let added = false;
        // for each data
        for (const { day, win, equality, loose } of datas) {
          // is the great day
          if (day === parseInt(dayId)) {
            winA.push(win);
            equalityA.push(equality);
            looseA.push(loose);
            total.push(win + equality + loose);
            added = true;
            break;
          }
        }

        if (!added) {
          winA.push(0);
          equalityA.push(0);
          looseA.push(0);
          total.push(0);
        }
      }

      setGamesData({
        labels: dayLabel,
        datasets: [
          {
            data: total,
            borderColor: color.white,
            tension: 0.25,
          },
          {
            type: "bar",
            data: winA,
            fill: true,
            backgroundColor: color.green,
          },
          {
            type: "bar",
            data: equalityA,
            fill: true,
            backgroundColor: color.yellow,
          },
          {
            type: "bar",
            data: looseA,
            fill: true,
            backgroundColor: color.red,
          },
        ],
      });
    }
  }, [data.username]);

  useEffect(async () => {
    // get auth
    const res = await AuthApi.index();
    if (!res.state) return;

    setAuth(res.role);
    setLang(res.lang);
  }, []);

  return (
    <Page title={t("profile:metaTitle")} auth={auth} locale={locale} language={lang}>
      <Section>
        <SearchHeader max label={t("profile:searchLabel")} search={searchHeader} setSearch={setSearchHeader} handleSearch={handleSearchHeader} placeholder="" data={searchHeaderData} />
        <Profile imgSrc={data?.imgSrc ? data.imgSrc : `default.png`} username={data?.username ? data.username : t("profile:noData")} lastConnection={data?.lastConnection ? convertDatetimeInTimeSpent(data.lastConnection, locale) : t("profile:noData")} createdDate={data?.createDate ? convertDatetimeInDate(data.createDate, locale) : t("profile:noData")} />
        <div className="section-profile-stats">
          <h2 className="section-subtitle">{t("profile:chartTitle")}</h2>
          <ChartWrapper title={t("profile:chartSubtitle")}>
            <div className="chart-legend-wrapper">
              <ChartLegend text={t("profile:chartLegendTotal")} color={color.white} />
              <ChartLegend text={t("profile:chartLegendWin")} color={color.green} bar />
              <ChartLegend text={t("profile:chartLegendEquality")} color={color.yellow} bar />
              <ChartLegend text={t("profile:chartLegendLoose")} color={color.red} bar />
            </div>
            {gamesData && <Line options={chartOptions} data={gamesData} />}
          </ChartWrapper>
        </div>
        <ProfileTemplate currentNav={currentNav} setCurrentNav={setCurrentNav} username={data?.username ? data.username : null} />
      </Section>
    </Page>
  );
}

export async function getServerSideProps({ query, locale }) {
  const res = await ProfileApi.index(query.username);

  // user not exist
  if (!res.state)
    return {
      notFound: true,
    };

  return {
    props: {
      data: res,
      locale,
    },
  };
}
