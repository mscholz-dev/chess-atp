module.exports = {
  // languages
  locales: ["default", "fr", "en"],
  // default language
  defaultLocale: "default",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/": ["index"],
    "/legal-notice": ["legalNotice"],
    "/login": ["login"],
    "/register": ["register"],
    "/dashboard": ["dashboard"],
    "/404": ["404"],
    "/game": ["game"],
    "/profile/[username]": ["profile"],
    "/profile/edit/[username]": ["profileEdit"],
    "/dashboard/admins": ["dashboardAdmins"],
    "/dashboard/statistics": ["dashboardStatistics"],
    "/dashboard/users": ["dashboardUsers"],
    "/dashboard/create/admin": ["dashboardAdminCreate"],
  },
};
