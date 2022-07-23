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

  static async admin() {
    return await api
      .post(
        `/auth/admin`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async superAdmin() {
    return await api
      .post(
        `/auth/superadmin`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }
}
