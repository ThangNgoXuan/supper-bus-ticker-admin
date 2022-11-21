import axiosClient from "./axiosClient";

const TripApi = {
    getAllTrip: () => {
        const url = "/trip"
        return axiosClient.get(url)
    },
    createTrip: (data) => {
        const url = "/trip"
        return axiosClient.post(url, data)
    },
    updateTrip: (id,data) => {
        const url = `trip/${id}`
        return axiosClient.put(url, data)
    }
}

export default TripApi;