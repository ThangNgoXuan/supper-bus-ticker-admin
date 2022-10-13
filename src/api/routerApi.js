import axiosClient from "./axiosClient";

const routerApi = {
    getAllRoute: () => {
        const url = "/route";
        return axiosClient.get(url);
    },
    createRoter: (data) => {
        const url = '/route'
        return axiosClient.post(url, data);
    },
    createPointInRoute: (data, id) => {
        const url = `/${id}`
        return axiosClient.post(url, data);
    }
};

export default routerApi;