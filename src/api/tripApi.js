import axiosClient from "./axiosClient";

const TripApi = {
    getAllTrip: () => {
        const url = "/trip"
        return axiosClient.get(url)
    },
    createTrip: (data) => {
        const url = "/trip"
        return axiosClient.post(url, data)
    }
}

export default TripApi;