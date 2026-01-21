import axiosClient from "./axiosClient";

const reviewApi = {
    /**
     * Tạo review cho booking
     * @param {Object} data
     * data = { bookingId, rating, comment }
     */
    createReview(data) {
        return axiosClient.post("/reviews", data);
    },

    /**
     * Lấy tất cả review của 1 phòng
     * @param {string} roomId
     */
    getReviewsByRoom(roomId) {
        return axiosClient.get(`/reviews/room/${roomId}`);
    },

    /**
     * Kiểm tra booking đã review chưa
     * @param {string} bookingId
     */
    getReviewByBooking(bookingId) {
        return axiosClient.get(`/reviews/booking/${bookingId}`);
    },

    /**
     * Lấy danh sách bookingId mà user đã review
     */
    getMyReviewedBookings() {
        return axiosClient.get("/reviews/my-reviewed-bookings");
    }
};

export default reviewApi;
