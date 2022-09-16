import axiosClient from "./axiosClient";

const TypeCoachApi = {
  getAllTypeCoach: () => {
    const url = "/vehicle-category";
    return axiosClient.get(url);
  },
  addTypeCoach: (data) => {
    const url = `/vehicle-category`
    return axiosClient.post(url, data);
  },
  updateTypeCoach: (data) => {
    const url = `/vehicle-category/${data._id}`
    return axiosClient.put(url, data);
  },
  deleteTypeCoach: (id) => {
    const url = `/vehicle-category/${id}`
    return axiosClient.delete(url);
  },

};

export default TypeCoachApi;