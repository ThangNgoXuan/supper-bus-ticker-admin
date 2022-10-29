import axiosClient from "./axiosClient";

const AboutApi = {
    getAbout: () => {
        const url = "/contact"
        return axiosClient.get(url)
    },
    updateAbout: (data) => {
        const url = '/contact'
        return axiosClient.put(url, data)
    }
}

export default AboutApi;