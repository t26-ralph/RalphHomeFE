import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import roomApi from "../api/roomApi";
import RoomCard from "../components/RoomCard";
import RoomSearchForm from "../components/RoomSearchForm";

export default function RoomPage() {
    const location = useLocation();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});

    // 🧭 Lấy query từ URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFilters = {
            city: params.get("city") || "",
            maxPeople: params.get("maxPeople") || "",
            price: params.get("price") || "",
            hotel: params.get("hotel") || "",
        };
        // ✅ Chỉ setFilters nếu có thay đổi
        setFilters((prev) => {
            const isDifferent = Object.keys(queryFilters).some(
                (key) => prev[key] !== queryFilters[key]
            );
            return isDifferent ? queryFilters : prev;
        });
    }, [location.search]);

    // 🧩 Gọi API khi filters thay đổi
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);

                // 🔥 Clean filter
                const cleanedFilters = Object.fromEntries(
                    Object.entries(filters).filter(([_, v]) => v !== "" && v !== null)
                );

                const res = await roomApi.searchRooms(cleanedFilters);
                setRooms(res.data);
            } catch (err) {
                console.error("Lỗi tải phòng:", err);
            } finally {
                setLoading(false);
            }
        };

        if (Object.keys(filters).length > 0) fetchRooms();
    }, [filters]);

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="max-w-6xl mx-auto mt-28 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Danh sách phòng</h1>
            <RoomSearchForm onSearch={handleSearch} initialFilters={filters} inline />
            {loading ? (
                <p className="mt-10 text-center text-gray-600">Đang tải danh sách phòng...</p>
            ) : rooms.length === 0 ? (
                <p className="mt-10 text-center text-gray-600">Không có phòng phù hợp.</p>
            ) : (
                <div className="flex flex-col items-center gap-6 w-full mt-10">
                    {rooms.map((room) => (
                        <div key={room._id} className="w-full max-w-[1200px]">
                            <RoomCard room={room} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
