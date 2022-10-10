import axiosClient from "./axiosClient";

const authApi = {
  login: async (data) => {
    const url = "/user/login";
    return await axiosClient.post(url, data);
  },
};

export default authApi;
