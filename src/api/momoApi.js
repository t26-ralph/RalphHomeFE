import axiosClient from "./axiosClient";

const momoApi = {
    // Gửi yêu cầu tạo thanh toán Momo
    createPayment: (bookingId) => {
        return axiosClient.post("/momo/create-payment", { bookingId });
    },

    // Webhook chỉ để BE gọi, nên FE thường không dùng, nhưng có thể để debug nếu muốn
    verifyPayment: (data) => {
        return axiosClient.post("/momo/webhook", data);
    },
};

export default momoApi;
