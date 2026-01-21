import axiosClient from "./axiosClient";

const authApi = {
    register: (data) => axiosClient.post("/users/register", data),
    login: (data) => axiosClient.post("/users/login", data),
    getMe: () => axiosClient.get("/users/me"),
    googleLogin: (data) => axiosClient.post("/auth/google", data),
};

export default authApi;
