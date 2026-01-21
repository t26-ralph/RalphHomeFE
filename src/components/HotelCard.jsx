import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

export default function HotelCard({ hotel }) {
    const imageUrl =
        hotel.coverImage
            ? hotel.coverImage
            : (hotel.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image");

    return (
        <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group flex flex-row h-[200px]">
            {/* Ảnh khách sạn */}
            <div className="relative w-1/3 h-full overflow-hidden flex-shrink-0 rounded-md">
                <img
                    src={imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                    <h2 className="text-white text-lg font-semibold text-center px-2">
                        {hotel.name}
                    </h2>
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 flex flex-col justify-between w-2/3">
                {/* Tên + rating */}
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                        {hotel.name}
                    </h3>
                </div>
                

                {/* Địa điểm */}
                <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin size={14} className="mr-1 text-blue-500" />
                    <span className="truncate">{hotel.address || "Không rõ vị trí"}</span>
                </div>

                {/* Mô tả */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {hotel.description || "Chưa có mô tả cho khách sạn này."}
                </p>

                {/* Nút xem chi tiết bên phải */}
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
}
