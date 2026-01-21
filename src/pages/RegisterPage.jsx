import { useState } from "react";
import authApi from "../api/authApi";
import BgRe from "../assets/BG.png"
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { setUser } = useContext(AuthContext);

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên";
        if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email không hợp lệ";

        if (!form.password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (form.password.length < 6) newErrors.password = "Mật khẩu phải ít nhất 6 ký tự";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
    };


    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (loading) return; // tránh click liên tục
        setLoading(true);
        try {
            await authApi.register(form);
            alert("Đăng ký thành công, hãy đăng nhập!");
            navigate("/login");
        } catch (err) {
            const errorMsg =
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg || // nhiều backend trả theo dạng errors[]
                "Lỗi đăng ký. Vui lòng thử lại.";
            alert(errorMsg);
            console.error("❌ Register error:", err.response?.data || err);
        } finally {
            setLoading(false);
        }
    };

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

    const handleGoogleFailure = () => {
        alert("Google Login không thành công, vui lòng thử lại!");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${BgRe})` }}
        >
            {/* Overlay mờ */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            {/* Form đăng ký */}
            <div className="relative p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="flex text-xl font-bold mb-4 justify-center text-white">Đăng ký</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <input
                            name="name"
                            placeholder="Tên"
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {errors.api && (
                        <p className="text-red-500 text-center font-medium mt-2">{errors.api}</p>
                    )}
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="bg-[#24305E] text-white py-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                    <div className="flex justify-center mt-4">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            text="signup_with"
                            theme="filled_blue"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
