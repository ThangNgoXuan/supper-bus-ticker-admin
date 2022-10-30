import axiosClient from "./axiosClient";

const routerApi = {
  getAllRoute: () => {
    const url = "/route";
    return axiosClient.get(url);
  },
  createRouter: (data) => {
    const url = "/route";
    return axiosClient.post(url, data);
  },
  createPointInRoute: (data, id) => {
    const url = `/${id}`;
    return axiosClient.post(url, data);
  },
  deleteRoute: (id) => {
    const url = `/route/${id}`;
    return axiosClient.delete(url);
  },
  updateRoute: (data, id) => {
    const url = `/route/${id}`;
    return axiosClient.post(url, data);
  },
};

export default routerApi;
