import axiosClient from "./axiosClient";

const bookingApi = {
    create: (data) => axiosClient.post("/bookings", data),
    getUserBookings: () => axiosClient.get("/bookings/my"),
    getById: (id) => axiosClient.get(`/bookings/${id}`),
    cancel: (id) => axiosClient.delete(`/bookings/${id}`),
};

export default bookingApi;
