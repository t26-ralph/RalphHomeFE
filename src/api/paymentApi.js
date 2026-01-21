import axiosClient from "./axiosClient";

const paymentApi = {
    create: (data, config) => axiosClient.post("/payments", data, config),
    getMyPayments: (config) => axiosClient.get("/payments/my", config),
};

export default paymentApi;
