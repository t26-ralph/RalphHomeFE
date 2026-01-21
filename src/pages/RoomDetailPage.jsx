import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import roomApi from "../api/roomApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function RoomDetailPage() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await roomApi.getRoom(id);
                setRoom(res.data);
            } catch (error) {
                console.error("Lỗi khi tải phòng:", error);
            }
        };
        fetchRoom();
    }, [id]);

    const handleBooking = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để đặt phòng!");
            navigate("/login");
        } else {
            navigate(`/booking/${room._id}`);
        }
    };

    const handleBack = () => {
        navigate(-1); // quay lại trang trước
    };

    if (!room) return <p>Đang tải...</p>;

    return (
        <div className="pt-[100px] p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-2xl mt-28 md:mt-32">

            {/* 🔙 NÚT BACK */}
            <button
                onClick={handleBack}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium"
            >
                ← Quay lại
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 🖼️ Cột trái - hình ảnh */}
                <div className="md:w-1/2">
                    {room.images && room.images.length > 0 && (
                        <>
                            <Swiper
                                modules={[Pagination, Navigation, Thumbs]}
                                navigation
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper }}
                                className="rounded-2xl mb-4"
                            >
                                {room.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={`${room.name}-${index}`}
                                            className="w-full h-[400px] object-cover rounded-2xl"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                modules={[Navigation, Thumbs]}
                                watchSlidesProgress
                                className="rounded-xl"
                            >
                                {room.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={`thumb-${index}`}
                                            className="w-full h-[90px] object-cover rounded-xl cursor-pointer border border-gray-300 hover:border-green-500"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    )}
                </div>

                {/* 🏠 Cột phải - Thông tin */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold">{room.name}</h1>
                            <span
                                className={`px-3 py-1 text-sm rounded-full font-medium ${room.available
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {room.available ? "Còn trống" : "Hết phòng"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-yellow-500">
                            {"★".repeat(Math.round(room.rating || 0)) || "Chưa có đánh giá"}
                            <span className="text-gray-600 ml-2 text-sm">
                                ({room.numReviews} đánh giá)
                            </span>
                        </div>

                        <div className="mt-4 text-gray-700 space-y-2">
                            <p className="text-lg">
                                <strong>Giá:</strong>{" "}
                                <span className="text-green-600 font-semibold">
                                    {room.price.toLocaleString()} VND/đêm
                                </span>
                            </p>
                            <p><strong>Sức chứa:</strong> {room.maxPeople} người</p>
                            {room.location && (
                                <p><strong>Vị trí:</strong> {room.location}</p>
                            )}
                        </div>

                        {room.description && (
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                {room.description}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={!room.available}
                        className={`mt-6 w-full py-3 rounded-lg font-semibold text-lg transition ${room.available
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-400 text-white cursor-not-allowed"
                            }`}
                    >
                        {room.available ? "Đặt phòng ngay" : "Hết phòng"}
                    </button>
                </div>
            </div>
        </div>
    );
}
