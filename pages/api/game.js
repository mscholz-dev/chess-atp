import api from "./index";

export default class GameApi {
  static async index() {
    return await api
      .post(
        `/game`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async enemy() {
    return await api
      .post(
        `/game/enemy`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }

  static async history({ search }) {
    return await api
      .post(
        `/game/history`,
        { search },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
  }
}
