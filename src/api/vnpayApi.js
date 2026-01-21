import axiosClient from "./axiosClient";

const vnpayApi = {
    createPayment: (bookingId) => {
        return axiosClient.post("/vnpay/create", { bookingId });
    }
};

export default vnpayApi;
