import React, { useEffect, useState } from "react";
import Logo from "../assets/LOGO7.png";
import TouchableOpacity from "./TouchableOpacity";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Header() {
    // const [user, setUser] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        try {
            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("user"); // dọn rác nếu có
            }
        } catch (err) {
            console.error("Invalid user JSON:", err);
            localStorage.removeItem("user");
        }
    }, [setUser]);

    const handleGoToLogin = () => {
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        navigate("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        // navigate("/");
    };
    const handleChangePassword = () => {
        navigate("/change-password");
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-[#24305E] shadow-md z-50 flex justify-center items-center h-[100px] px-6">
            <nav className="flex justify-between items-center w-full mx-auto px-6">
                {/* Logo + Menu chính */}
                <div className="flex items-center gap-10">
                    <TouchableOpacity onClick={handleGoToLogin}>
                        <img
                            src={Logo}
                            alt="Logo"
                            className="h-[120px] w-[120px] object-contain cursor-pointer"
                        />
                    </TouchableOpacity>

                    <ul className="flex gap-6 list-none">
                        <li><a href="/" className="text-slate-300 hover:text-[#1e274d] font-semibold transition">Trang chủ</a></li>
                        <li><a href="/hotels" className="text-slate-300 hover:text-[#1e274d] font-semibold transition">Khách sạn</a></li>
                        <li><a href="/rooms" className="text-slate-300 hover:text-[#1e274d] font-semibold transition">Phòng</a></li>
                        <li><a href="/about" className="text-slate-300 hover:text-[#1e274d] font-semibold transition">Giới thiệu</a></li>
                        <li><a href="/contact" className="text-slate-300 hover:text-[#1e274d] font-semibold transition">Liên hệ</a></li>
                    </ul>
                </div>

                {/* Phần User */}
                <div className="relative flex items-center">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="flex items-center gap-2 text-#1e274d font-semibold bg-white px-4 py-2 rounded-full shadow hover:bg-slate-100 transition"
                            >
                                <span className="text-[#24305E]">{user.name}</span>
                                <svg
                                    className={`w-4 h-4 text-[#24305E] transition-transform ${openDropdown ? "rotate-180" : ""}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openDropdown && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fadeIn z-50"
                                >
                                    <a
                                        href="/my-bookings"
                                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                                    >
                                        Lịch sử đặt phòng
                                    </a>
                                    <a onClick={handleChangePassword}
                                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium"
                                    >
                                        Đổi mật khẩu
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-4">
                                <a href="/login" className="bg-[#A8D0E6] text-[#24305E] font-bold px-4 py-2 rounded-lg hover:bg-#1e274d transition">Đăng nhập</a>
                                <a href="/register" className="bg-[#A8D0E6] text-[#24305E] font-bold px-4 py-2 rounded-lg hover:bg-#1e274d transition">Đăng ký</a>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
