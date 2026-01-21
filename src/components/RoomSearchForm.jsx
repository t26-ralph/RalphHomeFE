import { useEffect, useState } from "react";
import hotelApi from "../api/hotelApi";
import { useNavigate } from "react-router-dom";

export default function RoomSearchForm({ onSearch, initialFilters = {}, inline = false }) {
    const [locations, setLocations] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [filters, setFilters] = useState({
        city: initialFilters.city || "",
        maxPeople: initialFilters.maxPeople || "",
        price: initialFilters.price || "",
        hotel: initialFilters.hotel || "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resHotels = await hotelApi.getHotels();
                setHotels(resHotels.data);
                const uniqueLocations = [...new Set(resHotels.data.map(h => h.city))];
                setLocations(uniqueLocations);
            } catch (err) {
                console.error("Lỗi khi tải danh sách hotel:", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // 🔒 Chỉ cập nhật nếu initialFilters thật sự khác
        setFilters((prev) => {
            const next = {
                city: initialFilters.city || "",
                maxPeople: initialFilters.maxPeople || "",
                price: initialFilters.price || "",
                hotel: initialFilters.hotel || "",
            };
            const changed = Object.keys(next).some((key) => prev[key] !== next[key]);
            return changed ? next : prev;
        });
    }, [initialFilters]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 👉 Gửi query sang RoomPage
        const params = new URLSearchParams(filters);
        navigate(`/rooms?${params.toString()}`);

        if (onSearch) onSearch(filters);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-5 gap-4 items-end ${inline ? "mt-10" : "mt-28"
                }`}
        >
            {/* 🏙️ Vị trí */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Vị trí</label>
                <select
                    name="city"
                    value={filters.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option value="">Tất cả</option>
                    {locations.map((loc, i) => (
                        <option key={i} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* 👥 Sức chứa */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Sức chứa</label>
                <select
                    name="maxPeople"
                    value={filters.maxPeople}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option value="">Tất cả</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} người</option>
                    ))}
                </select>
            </div>

            {/* 💰 Khoảng giá */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Khoảng giá</label>
                <select
                    name="price"
                    value={filters.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option value="">Tất cả</option>
                    <option value="0-500000">Dưới 500.000</option>
                    <option value="500000-1000000">500.000 - 1.000.000</option>
                    <option value="1000000-2000000">1.000.000 - 2.000.000</option>
                    <option value="2000000-999999999">Trên 2.000.000</option>
                </select>
            </div>

            {/* 🏨 Khách sạn */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Khách sạn</label>
                <select
                    name="hotel"
                    value={filters.hotel}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option value="">Tất cả</option>
                    {hotels.map((h) => (
                        <option key={h._id} value={h._id}>{h.name}</option>
                    ))}
                </select>
            </div>

            {/* 🔍 Nút tìm kiếm */}
            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
                Tìm kiếm
            </button>
        </form>
    );
}
