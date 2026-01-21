import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import authApi from "../api/authApi";
import BgLogin from "../assets/1.jpg"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
//import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //console.log("Gửi request login với:", form);
            const res = await authApi.login(form);
            //console.log("Login response:", res.data);

            const { token, role, ...userData } = res.data;

            // chặn admin đăng nhập ở đây
            if (role === "admin") {
                alert("Tài khoản admin không được phép đăng nhập tại trang này!");
                return; // Dừng luôn
            }

            // 🟢 Lưu token và user info
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({ ...userData, role }));

            setUser({ ...userData, role }); 
            // Lấy đường dẫn mà user định vào trước khi login
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin"); // dọn cho sạch

            alert("🎉 Đăng nhập thành công!");
            navigate(redirectPath);
        } catch (err) {
            console.error("❌ Login lỗi:", err);
            alert(err.response?.data?.message || "Lỗi đăng nhập");
        }
    };

    // Hàm xử lý khi đăng nhập Google thành công
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential; // ✅ Lấy đúng ID token từ Google

            const res = await authApi.googleLogin({ token }); // Gửi token lên backend

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            alert("Đăng nhập bằng Google thành công!");
            navigate("/");
        } catch (err) {
            console.error("Google login error:", err);
            alert("Đăng nhập Google thất bại, vui lòng thử lại!");
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${BgLogin})` }}
        >
            {/* Overlay mờ */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Form login */}
            <div className="relative bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Đăng nhập</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#24305E]"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#24305E]"
                    />
                    <button
                        type="submit"
                        className="bg-[#24305E] text-white py-3 rounded-lg font-semibold hover:bg-[#1e274d] transition duration-300"
                    >
                        Đăng nhập
                    </button>
                </form>
                <div className="mt-6 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => alert("Đăng nhập Google thất bại")}
                    />
                </div>
            </div>
        </div>
    );
}
