import axiosClient from "./axiosClient";

const userApi = {
    getAll: () => {
        const url = "/user"
        return axiosClient.get(url)
    },
    createEmployee: (data) => {
        const url = "/user/register"
        return axiosClient.post(url, data)
    },
    updateEmployee: (id,data) => {
        const url = `/user/${id}`
        return axiosClient.put(url, data)
    },
    deteteEmployee: (id) => {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    },
}

export default userApi;