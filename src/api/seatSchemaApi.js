import axiosClient from "./axiosClient";

const SeatSchemaApi = {
    getAllSeatSchema: () => {
        const url = "/seat/all"
        return axiosClient.get(url)
    }
}

export default SeatSchemaApi;