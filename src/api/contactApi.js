import axiosClient from "./axiosClient";

const ContactApi = {
    getContact: () => {
        const url = "/contact"
        return axiosClient.get(url)
    },
    updateContact: (data) => {
        const url = '/contact'
        return axiosClient.put(url, data)
    }
}

export default ContactApi;