import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        // Kiểm tra input cơ bản
        if (!oldPassword || !newPassword || !confirmPassword) {
            return alert("Vui lòng điền đầy đủ thông tin!");
        }

        if (newPassword !== confirmPassword) {
            return alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            return alert("Vui lòng đăng nhập để đổi mật khẩu!");
        }

        try {
            setLoading(true);
            const res = await axiosClient.post(
                "/users/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(res.data.message || "Đổi mật khẩu thành công!");
            // Reset form
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Đổi mật khẩu thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-28 p-8 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Đổi mật khẩu
            </h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Mật khẩu cũ
                    </label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Xác nhận mật khẩu mới
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className={`w-full py-3 mt-4 rounded-xl font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </button>
            </div>
        </div>
    );
}
