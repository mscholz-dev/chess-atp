import api from "./index";

export default class AdminApi {
  static async userDelete(username) {
    return await api
      .delete(
        `/admin/user/delete/${username}`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async usersSearch(username, paging) {
    return await api
      .post(
        `/admin/users/search`,
        { username, paging },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }
}
