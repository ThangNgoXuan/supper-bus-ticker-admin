import axiosClient from "./axiosClient";

const CoachApi = {
    getAllCoach: () => {
        const url = '/vehicle'
        return axiosClient.get(url)
    },
    createCoach: (data) => {
        const url = '/vehicle'
        return axiosClient.post(url, data)
    }
}

export default CoachApi;