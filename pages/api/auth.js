import api from "./index";

export default class AuthApi {
  static async index() {
    return await api
      .post(
        `/auth`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async admin(cookie) {
    return await api
      .post(
        `/auth/admin`,
        {},
        {
          headers: {
            accept: "application/json",
            Cookie: cookie,
          },
        }
      )
      .then((res) => res.data);
  }

  static async superAdmin(cookie) {
    return await api
      .post(
        `/auth/superadmin`,
        {},
        {
          headers: {
            accept: "application/json",
            Cookie: cookie,
          },
        }
      )
      .then((res) => res.data);
  }
}
