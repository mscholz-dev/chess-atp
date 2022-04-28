import api from "./index";

export default class RegisterApi {
  static async index(data) {
    return await api
      .post(`/register`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }
}
