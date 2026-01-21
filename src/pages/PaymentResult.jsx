// pages/PaymentResult.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentResult() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const status = params.get("status");
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(c => c - 1);
        }, 1000);

        const timer = setTimeout(() => {
            navigate("/my-bookings");
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);
    useEffect(() => {
        setTimeout(() => navigate("/my-bookings"), 8000);
    }, []);
    

    return (
        <div className="mt-32 text-center">
            {status === "Success" ? (
                <h1 className="text-2xl text-green-600 font-bold">
                    ✅ Thanh toán thành công
                </h1>
            ) : (
                <h1 className="text-2xl text-red-600 font-bold">
                    ❌ Thanh toán thất bại
                </h1>
            )}
            <p className="mt-4">
                Đang chuyển về trang đặt phòng trong {countdown}s...
            </p>
        </div>
    );
}
