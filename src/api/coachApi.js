import axiosClient from "./axiosClient";

const CoachApi = {
    getAllCoach: () => {
        const url = '/vehicle'
        return axiosClient.get(url)
    },
    createCoach: (data) => {
        const url = '/vehicle'
        return axiosClient.post(url, data)
    },
    deleteCoach: (id) => {
        const url = `/vehicle/${id}`;
        return axiosClient.delete(url);
    },
    updateCoach: (id,data) => {
        const url = `/vehicle/${id}`;
        return axiosClient.put(url, data);
    }
}

export default CoachApi;