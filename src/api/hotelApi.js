import axiosClient from "./axiosClient";

const hotelApi = {
    getHotels: () => axiosClient.get("/hotels"),
    getHotel: (id) => axiosClient.get(`/hotels/${id}`),
    getTop: () => axiosClient.get("/hotels/top"),
};

export default hotelApi;
