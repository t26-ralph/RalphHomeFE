import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingApi from "../api/bookingApi";
import ReviewDialog from "../components/ReviewDialog";

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelBookingId, setCancelBookingId] = useState(null);
    const [filter, setFilter] = useState("all");

    // REVIEW
    const [openReview, setOpenReview] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const res = await bookingApi.getUserBookings();
            const sorted = [...(res.data || [])].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setBookings(sorted);
        } catch (err) {
            console.error("❌ Lỗi tải booking:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // ===== FILTER =====
    const filteredBookings = bookings.filter((b) => {
        const pay = (b.paymentStatus || "").toLowerCase();
        const stat = (b.status || "").toLowerCase();

        switch (filter) {
            case "unpaid":
                return (pay === "unpaid" || pay === "pending") && stat !== "cancelled";
            case "paid":
                return (pay === "paid" || pay === "deposit") && stat !== "cancelled";
            case "cancelled":
                return stat === "cancelled";
            default:
                return true;
        }
    });

    const handleCancel = async () => {
        try {
            await bookingApi.cancel(cancelBookingId);
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === cancelBookingId
                        ? { ...b, status: "Cancelled" }
                        : b
                )
            );
            setCancelBookingId(null);
            alert("✅ Hủy booking thành công!");
        } catch (err) {
            alert(err.response?.data?.message || "❌ Hủy booking thất bại");
            setCancelBookingId(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-28 px-4 space-y-6">
            <h1 className="text-3xl font-bold text-center">
                Lịch sử đặt phòng
            </h1>

            {/* FILTER */}
            <div className="flex justify-center gap-3 flex-wrap">
                {[
                    { key: "all", label: "Tất cả" },
                    { key: "unpaid", label: "Chưa thanh toán" },
                    { key: "paid", label: "Đã thanh toán / Đặt cọc" },
                    { key: "cancelled", label: "Đã hủy" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`px-4 py-2 rounded-full font-semibold transition
                            ${filter === key
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading && (
                <p className="text-center text-gray-500 mt-10">
                    Đang tải lịch sử đặt phòng...
                </p>
            )}

            {!loading &&
                filteredBookings.map((booking) => {
                    const isPaid = booking.paymentStatus === "Paid";
                    const isDeposit = booking.paymentStatus === "Deposit";
                    const isCancelled = booking.status === "Cancelled";

                    // ===== REVIEW RULE =====
                    // const canReview =
                    //     isPaid &&
                    //     booking.status === "Confirmed" &&
                    //     new Date() > new Date(booking.checkOutDate) &&
                    //     booking.reviewed !== true;

                    // ===== STATUS BADGE =====
                    const statusLabel = isCancelled
                        ? { text: "Đã hủy", cls: "bg-red-500" }
                        : isPaid
                            ? { text: "Đã thanh toán", cls: "bg-green-600" }
                            : isDeposit
                                ? { text: "Đã đặt cọc", cls: "bg-blue-500" }
                                : { text: "Chưa thanh toán", cls: "bg-yellow-400" };

                    return (
                        <div
                            key={booking._id}
                            className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between gap-4"
                        >
                            {/* INFO */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full text-white font-semibold ${statusLabel.cls}`}
                                    >
                                        {statusLabel.text}
                                    </span>

                                    <h2 className="text-xl font-semibold">
                                        {booking.room?.name || "Phòng đã bị xóa"}
                                    </h2>
                                </div>

                                <p className="text-gray-600">
                                    Nhận:{" "}
                                    {new Date(booking.checkInDate).toLocaleDateString("vi-VN")}
                                </p>
                                <p className="text-gray-600">
                                    Trả:{" "}
                                    {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
                                </p>

                                <p className="text-green-600 font-semibold mt-2">
                                    Tổng tiền:{" "}
                                    {booking.totalPrice?.toLocaleString("vi-VN")} ₫
                                </p>
                            </div>

                            {/* ACTION */}
                            <div className="flex flex-col gap-2 justify-center">
                                {/* THANH TOÁN */}
                                {!isPaid && !isDeposit && !isCancelled && (
                                    <button
                                        onClick={() =>
                                            navigate(`/payment/${booking._id}`)
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold"
                                    >
                                        Thanh toán
                                    </button>
                                )}

                                {/* REVIEW */}
                                {/* {canReview && (
                                    <button
                                        onClick={() => {
                                            setSelectedBookingId(booking._id);
                                            setOpenReview(true);
                                        }}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold"
                                    >
                                        Đánh giá ⭐
                                    </button>
                                )} */}

                                {/* HỦY */}
                                {isCancelled ? (
                                    <button
                                        disabled
                                        className="bg-gray-400 text-white px-4 py-2 rounded-xl cursor-not-allowed"
                                    >
                                        Đã hủy
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setCancelBookingId(booking._id)
                                        }
                                        disabled={isPaid || isDeposit}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl font-semibold"
                                    >
                                        Hủy booking
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

            {/* MODAL HỦY */}
            {cancelBookingId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-80 text-center">
                        <p className="mb-4 font-semibold">
                            Bạn có chắc muốn hủy booking?
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={handleCancel}
                                className="bg-red-600 text-white px-4 py-2 rounded-xl"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => setCancelBookingId(null)}
                                className="bg-gray-300 px-4 py-2 rounded-xl"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REVIEW DIALOG */}
            <ReviewDialog
                open={openReview}
                bookingId={selectedBookingId}
                onClose={() => {
                    setOpenReview(false);
                    setSelectedBookingId(null);
                }}
                onSuccess={fetchBookings}
            />
        </div>
    );
}
