import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function RoomCard({ room }) {
    const imageUrl =
        room.images?.length > 0
            ? room.images[0]
            : "https://via.placeholder.com/400x300?text=No+Image";

    const statusColor = room.available
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";

    return (
        <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group flex flex-row h-[250px]">
            {/* Ảnh phòng */}
            <div className="relative w-1/3 h-full aspect-[16/10] overflow-hidden flex-shrink-0 rounded-md">
                <img
                    src={imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                    <h2 className="text-white text-lg font-semibold text-center px-2">
                        {room.name}
                    </h2>
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 flex flex-col flex-grow justify-between w-2/3">
                <div className="flex justify-between items-center mb-2">
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
                    >
                        {room.available ? "Còn phòng" : "Hết phòng"}
                    </span>
                    {/* <div className="flex items-center text-yellow-500 gap-1">
                        <Star size={20} />
                        <span className="text-sm md:text-base text-gray-700 font-semibold">
                            {room.rating?.toFixed(1) || "0.0"}
                        </span>
                    </div> */}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {room.description || "Không có mô tả."}
                </p>

                <p className="text-blue-600 font-bold text-base">
                    {room.price.toLocaleString()} VNĐ / đêm
                </p>

                <div className="flex justify-end">
                    <Link
                        to={`/rooms/${room._id}`}
                        className="mt-3 block text-center bg-[#24305E] text-white px-4 py-2 rounded-lg hover:bg-[#1e274d] transition duration-300 w-fit"
                    >
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
}
