import api from "./index";

export default class SuperAdminApi {
  static async adminsSearch(username, paging) {
    return await api
      .post(
        `/superadmin/admins/search`,
        { username, paging },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async adminDelete(username) {
    return await api
      .delete(
        `/superadmin/admin/delete/${username}`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async statsUsersNumber() {
    return await api
      .post(
        `/superadmin/stats/users/number`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async adminCreate(data) {
    return await api
      .post(`/superadmin/create/admin`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }

  static async statsGamesNumber() {
    return await api
      .post(
        `/superadmin/stats/games/number`,
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
