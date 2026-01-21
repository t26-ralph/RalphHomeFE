import { useState } from "react";
import momoApi from "../api/momoApi";

export default function MomoPayButton({ bookingId, totalPrice }) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await momoApi.createPayment(bookingId);
            if (res.data.payUrl) {
                window.location.href = res.data.payUrl; // Chuyển hướng tới trang thanh toán Momo
            } else {
                alert("Không thể tạo thanh toán Momo");
            }
        } catch (err) {
            console.error("❌ Momo payment error:", err);
            alert("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            disabled={loading || !totalPrice}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handlePayment}
        >
            {loading
                ? "Processing..."
                : totalPrice
                    ? `Pay ${totalPrice.toLocaleString()} ₫ with Momo`
                    : "Loading price..."}
        </button>
    );
}
