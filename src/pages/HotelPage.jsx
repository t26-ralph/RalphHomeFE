import { useEffect, useState } from "react";
import hotelApi from "../api/hotelApi";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

export default function HotelPage() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await hotelApi.getHotels(); // sửa tên api nếu cần
                setHotels(res.data);
            } catch (err) {
                console.error("Lỗi tải danh sách khách sạn:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return <p className="mt-24 text-center text-gray-600">Đang tải danh sách khách sạn...</p>;
    if (hotels.length === 0) return <p className="mt-24 text-center text-gray-600">Chưa có khách sạn nào.</p>;

    return (
        <div className="max-w-6xl mx-auto mt-28 px-4 space-y-4">
            <h1 className="text-3xl font-bold text-center mb-8">Danh sách khách sạn</h1>
            <div className="flex flex-col gap-4">
                {hotels.map((hotel) => {
                    const imageUrl = hotel.coverImage || hotel.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image";
                    return (
                        <div
                            key={hotel._id}
                            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-row h-[200px]"
                        >
                            <div className="w-1/3 h-full overflow-hidden flex-shrink-0 rounded-md">
                                <img
                                    src={imageUrl}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between w-2/3">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-base font-semibold text-gray-800 truncate">{hotel.name}</h3>
                                    <div className="flex items-center text-yellow-500 gap-2">
                                        <Star size={20} />
                                        <span className="text-sm md:text-base text-gray-700 font-semibold">
                                            {hotel.rating?.toFixed(1) || "0.0"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mb-2">
                                    <MapPin size={14} className="mr-1 text-blue-500" />
                                    <span className="truncate">{hotel.address || "Không rõ vị trí"}</span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{hotel.description || "Chưa có mô tả"}</p>
                                <div className="flex justify-end">
                                    <Link
                                        to={`/hotels/${hotel._id}`}
                                        className="mt-2 bg-[#24305E] text-white px-4 py-2 rounded-lg hover:bg-[#1e274d] transition duration-300"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
