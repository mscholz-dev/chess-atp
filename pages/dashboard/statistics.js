import React, { useEffect, useState } from "react";
import Page from "../../templates/layouts/Page";
import AuthApi from "../api/auth";
import Section from "../../templates/layouts/Section";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { returnSixLastMonth } from "../../utils/date";
import SuperAdminApi from "../api/superadmin";
import { useRouter } from "next/router";
import ChartWrapper from "../../templates/components/chart/ChartWrapper";
import ChartLegend from "../../templates/components/chart/ChartLegend";
import { color } from "../../utils/color";
import useTranslation from "next-translate/useTranslation";

export default function DashboardStatictics({ auth, locale, language }) {
  const { t } = useTranslation("dashboardStatistics");

  const router = useRouter();

  const monthLabel = returnSixLastMonth(false, locale);

  const [usersData, setUsersData] = useState(null);
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

  useEffect(() => {
    if (!auth) router.push("/");
  }, []);

  useEffect(async () => {
    const monthId = returnSixLastMonth(true, locale);

    const res = await SuperAdminApi.statsUsersNumber();
    if (res.state) {
      const datas = res.data;

      // stock users number data
      const totalArray = [];
      const clientArray = [];
      const adminArray = [];
      const superAdminArray = [];

      // for each month
      for (const month of monthId) {
        let added = false;
        // for each data
        for (const data of datas) {
          // is the great month
          if (data.id === parseInt(month)) {
            clientArray.push(data.client || 0);
            adminArray.push(data.admin || 0);
            superAdminArray.push(data.superAdmin || 0);

            let total = 0;

            if (data.client) total += data.client;
            if (data.admin) total += data.admin;
            if (data.superAdmin) total += data.superAdmin;

            totalArray.push(total);
            added = true;
          }
        }

        // if no data add for this month
        if (!added) {
          clientArray.push(0);
          adminArray.push(0);
          superAdminArray.push(0);
          totalArray.push(0);
        }
      }

      setUsersData({
        labels: monthLabel,
        datasets: [
          {
            data: totalArray,
            borderColor: color.white,
            tension: 0.25,
          },
          {
            data: clientArray,
            borderColor: color.green,
            tension: 0.25,
          },
          {
            data: adminArray,
            borderColor: color.yellow,
            tension: 0.25,
          },
          {
            data: superAdminArray,
            borderColor: color.red,
            tension: 0.25,
          },
        ],
      });
    }

    const res2 = await SuperAdminApi.statsGamesNumber();
    if (res2.state) {
      const datas = res2.data;
      const array = [];

      // for each month
      for (const month of monthId) {
        let added = false;
        // for each data
        for (const data of datas) {
          // is the great month
          if (data.month === parseInt(month)) {
            array.push(data.number || 0);
            added = true;
          }
        }

        // if no data add for this month
        if (!added) array.push(0);
      }

      setGamesData({
        labels: monthLabel,
        datasets: [
          {
            data: array,
            borderColor: color.primaryColor,
            tension: 0.25,
            fill: true,
            backgroundColor: color.primaryColorDarkTransparent,
          },
        ],
      });
    }
  }, []);

  return (
    <Page title={t("dashboardStatistics:metaTitle")} auth={auth} locale={locale} language={language}>
      <Section large stats>
        <h2 className="section-title">{t("dashboardStatistics:title")}</h2>
        <ChartWrapper title={t("dashboardStatistics:chartAccountTitle")}>
          <div className="chart-legend-wrapper">
            <ChartLegend text={t("dashboardStatistics:chartAccountLabelTotal")} color={color.white} />
            <ChartLegend text={t("dashboardStatistics:chartAccountLabelClient")} color={color.green} />
            <ChartLegend text={t("dashboardStatistics:chartAccountLabelAdmin")} color={color.yellow} />
            <ChartLegend text={t("dashboardStatistics:chartAccountLabelSuperAdmin")} color={color.red} />
          </div>
          {usersData && <Line options={chartOptions} data={usersData} />}
        </ChartWrapper>

        <ChartWrapper title={t("dashboardStatistics:chartPartyTitle")}>
          <div className="chart-legend-wrapper">
            <ChartLegend text={t("dashboardStatistics:chartPartyLabel")} color={color.white} />
          </div>
          {gamesData && <Line options={chartOptions} data={gamesData} />}
        </ChartWrapper>
      </Section>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;

  // no cookie
  if (!cookie)
    return {
      props: {
        auth: false,
        locale: context.locale,
        language: null,
      },
    };

  const res = await AuthApi.superAdmin(cookie);

  // if not a super admin
  if (!res.state)
    return {
      props: {
        auth: false,
        locale: context.locale,
        language: null,
      },
    };

  return {
    props: {
      auth: res.role,
      locale: context.locale,
      language: res.language,
    },
  };
}
