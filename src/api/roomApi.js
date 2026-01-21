// roomApiUser.js
import axiosClient from "./axiosClient";

const roomApi = {
    getRooms: () => axiosClient.get("/rooms"),
    getRoom: (id) => axiosClient.get(`/rooms/${id}`),
    searchRooms: (params) => axiosClient.get("/rooms/search", { params }),
    getTop: () => axiosClient.get("/rooms/top"),
    getRoomsByHotel: (hotelId) => axiosClient.get(`/rooms/hotel/${hotelId}`),
};

export default roomApi;
