import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingApi from "../api/bookingApi";
import paymentApi from "../api/paymentApi";
//import momoApi from "../api/momoApi";
//import vnpayApi from "../api/vnpayApi";

export default function PaymentPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [method, setMethod] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await bookingApi.getById(bookingId);
                setBooking(res.data);
            } catch (err) {
                console.error("❌ Lỗi tải booking:", err);
            }
        };
        fetchBooking();
    }, [bookingId]);

    // const handlePayment = async () => {
    //     if (!method) {
    //         alert("Vui lòng chọn phương thức thanh toán!");
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         const token = localStorage.getItem("token");

    //         // Gọi API một lần duy nhất
    //         const res = await paymentApi.create(
    //             { booking: bookingId, method },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );

    //         if (method === "Cash") {
    //             alert("✅ Đặt phòng thành công! Thanh toán khi nhận phòng.");
    //             navigate("/my-bookings");
    //             return;
    //         }

    //         // VNPay / MoMo → redirect
    //         if (res.data?.paymentUrl) {
    //             window.location.href = res.data.paymentUrl;
    //             return;
    //         }

    //         alert("Không thể tạo link thanh toán");
    //     } catch (err) {
    //         console.error("💥 Lỗi thanh toán:", err);
    //         alert(err.response?.data?.message || "Thanh toán thất bại");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handlePayment = async () => {
        if (!method) {
            alert("Vui lòng chọn phương thức thanh toán!");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await paymentApi.create(
                { booking: bookingId, method },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // ✅ ƯU TIÊN redirect nếu có paymentUrl
            if (res.data?.paymentUrl) {
                window.location.href = res.data.paymentUrl;
                return;
            }

            // ✅ CHỈ fallback khi Cash thuần (không cọc)
            if (method === "Cash") {
                alert("✅ Đặt phòng thành công! Thanh toán khi nhận phòng.");
                navigate("/my-bookings");
                return;
            }

            alert("Không thể tạo link thanh toán");
        } catch (err) {
            console.error("💥 Lỗi thanh toán:", err);
            alert(err.response?.data?.message || "Thanh toán thất bại");
        } finally {
            setLoading(false);
        }
    };


    if (!booking) {
        return <p className="mt-24 text-center">Đang tải thông tin thanh toán...</p>;
    }

    const methods = [
        {
            id: "Cash",
            name: "Thanh toán khi nhận phòng",
            logo: "https://cdn-icons-png.flaticon.com/512/2331/2331942.png",
            desc: "Đặt cọc 20% - Thanh toán 80% còn lại tại khách sạn",
        },
        {
            id: "Momo",
            name: "Ví MoMo",
            logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png",
            desc: "Thanh toán nhanh qua ví MoMo",
        },
        {
            id: "Vnpay",
            name: "VNPay",
            logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR-1024x800.png",
            desc: "Thanh toán an toàn qua VNPay",
        },
    ];

    return (
        <div className="max-w-lg mx-auto mt-28 p-8 bg-white rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Thanh toán đặt phòng
            </h1>

            <div className="mb-6 space-y-2">
                <p><strong>Khách hàng:</strong> {booking.user?.name}</p>
                <p><strong>Phòng:</strong> {booking.room?.name}</p>
                <p><strong>Tổng tiền:</strong> {booking.totalPrice?.toLocaleString()} ₫</p>
            </div>

            <div className="space-y-3">
                {methods.map((m) => (
                    <div
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer
                            ${method === m.id ? "border-green-500 bg-green-50" : "hover:bg-gray-50"}`}
                    >
                        <img src={m.logo} alt={m.name} className="w-10 h-10" />
                        <div>
                            <p className="font-semibold">{m.name}</p>
                            <p className="text-sm text-gray-500">{m.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handlePayment}
                disabled={loading || !method}
                className={`w-full mt-6 py-3 rounded-xl text-white
        ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
                {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
        </div>
    );
}
