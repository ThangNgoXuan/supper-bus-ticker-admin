import axiosClient from "./axiosClient";

const BoardingPointApi = {
  getAllBoardingPoint: () => {
    const url = "/boarding-point";
    return axiosClient.get(url);
  },
  addBoardingPoint: (data) => {
    const url = `/boarding-point`
    return axiosClient.post(url, data);
  },
  updateBoardingPoint: (data, id) => {
    const url = `/boarding-point/${id}`
    return axiosClient.put(url, data);
  },
  deleteBoardingPoint: (id) => {
    const url = `/boarding-point/${id}`
    return axiosClient.delete(url);
  },

};

export default BoardingPointApi;