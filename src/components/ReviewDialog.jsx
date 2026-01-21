import { useState } from "react";
import StarRating from "./StarRating";
import reviewApi from "../api/reviewApi";

export default function ReviewDialog({
    open,
    onClose,
    bookingId,
    onSuccess,
}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const submitReview = async () => {
        if (!rating) return alert("Vui lòng chọn số sao");

        try {
            setLoading(true);
            await reviewApi.create({
                bookingId,
                rating,
                comment,
            });
            onSuccess?.();
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Gửi đánh giá thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg space-y-4">
                <h2 className="text-xl font-bold text-center">
                    Đánh giá phòng
                </h2>

                {/* Rating */}
                <div className="flex justify-center">
                    <StarRating value={rating} onChange={setRating} />
                </div>

                {/* Comment */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    className="w-full h-24 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={submitReview}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold disabled:bg-gray-400"
                    >
                        {loading ? "Đang gửi..." : "Gửi đánh giá"}
                    </button>
                </div>
            </div>
        </div>
    );
}
