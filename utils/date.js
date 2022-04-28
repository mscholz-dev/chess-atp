import moment from "moment";
// moment translations
import "moment/locale/fr.js";
import "moment/locale/en-gb";

const useLocale = (locale) => {
  switch (locale) {
    case "fr":
      moment.locale("fr");
      break;
    case "en":
      moment.locale("en-gb");
      break;
    default:
      break;
  }
  return;
};

export const convertSecondInMinute = (time) => moment().minute(0).second(time).format("mm:ss");

export const convertDatetimeInDate = (time, locale) => {
  useLocale(locale);

  if (locale === "fr") return moment(time).format("D MMMM YYYY");
  if (locale === "en") return moment(time).format("MMMM D YYYY");
};

export const convertDatetimeInTimeSpent = (time, locale) => {
  useLocale(locale);
  return moment(time).fromNow();
};

export const returnSixLastMonth = (number, locale) => {
  useLocale(locale);

  const array = [];
  const format = number ? "M" : "MMMM";

  for (let i = 0; i < 6; i++) {
    array.push(moment().subtract(i, "months").format(format));
  }

  if (number) return array.reverse();

  const uppercase = [];
  for (const item of array) {
    uppercase.push(item[0].toUpperCase() + item.slice(1));
  }

  return uppercase.reverse();
};

export const returnSevenLastDay = (number, locale) => {
  useLocale(locale);

  const array = [];
  const format = number ? "D" : "dddd";

  for (let i = 0; i < 7; i++) {
    array.push(moment().subtract(i, "days").format(format));
  }

  if (number) return array.reverse();

  const uppercase = [];
  for (const item of array) {
    uppercase.push(item[0].toUpperCase() + item.slice(1));
  }

  return uppercase.reverse();
};
