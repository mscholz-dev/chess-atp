import api from "./index";

export default class ProfileApi {
  static async index(username) {
    return await api
      .post(
        `/profile`,
        { username },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async username() {
    return await api
      .post(
        `/profile/username`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async history({ search, username }) {
    return await api
      .post(
        `/profile/history`,
        { search, username },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async data(username) {
    return await api
      .post(
        `/profile/data`,
        { username },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async update(data) {
    return await api
      .patch(`/profile/update`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }

  static async search(username) {
    return await api
      .post(`/profile/search`, username, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res.data);
  }

  static async statsGamesNumber(username) {
    return await api
      .post(`/profile/stats/games`, username, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res.data);
  }
}
