import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import hotelApi from "../api/hotelApi";
import roomApi from "../api/roomApi";
import { MapPin, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HotelDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const resHotel = await hotelApi.getHotel(id);
                setHotel(resHotel.data);

                const resRooms = await roomApi.getRoomsByHotel(id);
                setRooms(resRooms.data);
            } catch (err) {
                console.error("Lỗi tải khách sạn:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHotel();
    }, [id]);

    if (loading) return <p className="mt-24 text-center text-gray-600">Đang tải khách sạn...</p>;
    if (!hotel) return <p className="mt-24 text-center text-gray-600">Không tìm thấy khách sạn.</p>;

    return (
        <div className="max-w-6xl mx-auto mt-28 px-4">
            {/* Slider ảnh */}
            {hotel.images && hotel.images.length > 0 && (
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="rounded-2xl mb-6 h-[400px] md:h-[500px]" // tăng chiều cao
                >
                    {hotel.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`${hotel.name}-${index}`}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Thông tin khách sạn */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-4 mb-2 text-gray-600">
                    <MapPin size={16} className="text-blue-500" />
                    <span>{hotel.address}, {hotel.city}</span>
                </div>
                <div className="flex items-center text-yellow-500 gap-1 mb-4">
                    <Star size={20} />
                    <span className="text-gray-700 font-semibold">{hotel.rating?.toFixed(1) || "0.0"}</span>
                </div>
                {hotel.description && <p className="text-gray-700">{hotel.description}</p>}
            </div>

            {/* Danh sách phòng */}
            <h2 className="text-2xl font-bold mb-4">Các phòng của khách sạn</h2>
            <div className="flex flex-col gap-6">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div
                            key={room._id}
                            className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row gap-4 items-center"
                        >
                            {/* Hình ảnh phòng */}
                            {room.images && room.images[0] && (
                                <img
                                    src={room.images[0]}
                                    alt={room.name || room.title}
                                    className="w-full md:w-1/3 h-48 object-cover rounded-xl"
                                />
                            )}

                            {/* Thông tin phòng */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-extrabold mb-1">{room.name || room.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                        {room.description || "Chưa có mô tả"}
                                    </p>
                                    <p className="text-green-600 font-semibold mb-1">
                                        {room.price?.toLocaleString()} VND / đêm
                                    </p>
                                    <p className="text-gray-700 mb-2">Sức chứa: {room.maxPeople} người</p>
                                </div>

                                <button
                                    onClick={() => navigate(`/rooms/${room._id}`)}
                                    className="mt-2 py-2 rounded-lg font-semibold bg-[#24305E] text-white hover:bg-[#1e274d] transition"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">Chưa có phòng nào.</p>
                )}
            </div>
        </div>
    );
}
