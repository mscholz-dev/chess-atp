import api from "./index";

export default class LoginApi {
  static async index(data) {
    return await api
      .post(`/login`, data, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res.data);
  }
}
