import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function MomoReturnPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu từ URL do Momo redirect trả về
        const resultCode = searchParams.get("resultCode");
        const message = searchParams.get("message");
        const orderId = searchParams.get("orderId");

        if (!resultCode) return;

        if (resultCode === "0") {
            setStatus({
                type: "success",
                title: "Thanh toán thành công 🎉",
                desc: `Mã đơn hàng: ${orderId}`,
            });
        } else {
            setStatus({
                type: "error",
                title: "Thanh toán thất bại ❌",
                desc: message || "Đã xảy ra lỗi khi thanh toán.",
            });
        }
    }, [searchParams]);

    if (!status)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-gray-600 text-lg">Đang xử lý kết quả thanh toán...</p>
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-md">
                {status.type === "success" ? (
                    <div className="text-green-500 text-5xl mb-3">✅</div>
                ) : (
                    <div className="text-red-500 text-5xl mb-3">❌</div>
                )}

                <h2
                    className={`text-2xl font-bold ${status.type === "success" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {status.title}
                </h2>
                <p className="text-gray-700 mt-2">{status.desc}</p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Quay về trang chủ
                </button>
            </div>
        </div>
    );
}
