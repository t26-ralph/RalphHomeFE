import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import roomApi from "../api/roomApi";
import RoomCard from "../components/RoomCard";
import hotelApi from "../api/hotelApi";
import HotelCard from "../components/HotelCard";
import ImageSlider from "../components/ImageSlider";
import RoomSearchForm from "../components/RoomSearchForm";
import { MapPin, Phone, Facebook, Twitter, Music } from "lucide-react";
export default function HomePage() {
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ đọc query từ URL
    const [filters, setFilters] = useState({});

    // 🔹 Lấy giá trị filter từ URL (VD: /?city=Hà Nội&maxPeople=2)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFilters = {
            city: params.get("city") || "",
            maxPeople: params.get("maxPeople") || "",
            price: params.get("price") || "",
            hotel: params.get("hotel") || "",
        };
        setFilters(queryFilters);
    }, [location.search]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await roomApi.getTop();
                setRooms(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phòng:", error);
            }
        };
        fetchRooms();
    }, []);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await hotelApi.getHotels();
                setHotels(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khách sạn:", error);
            }
        };
        fetchHotels();
    }, []);
    const displayedHotels = showAll ? hotels : hotels.slice(0, 5);
    const displayedRooms = showAll ? rooms : rooms.slice(0, 5);

    // 🔍 Khi người dùng tìm kiếm phòng từ homepage
    const handleSearch = (filters) => {
        // Điều hướng sang trang /rooms kèm query
        const query = new URLSearchParams(filters).toString();
        navigate(`/rooms?${query}`);
    };
    return (
        <>
            <div className="relative">
                <ImageSlider />

                <div className="absolute left-1/2 bottom-[-50px] transform -translate-x-1/2 w-[90%] max-w-5xl z-10">
                    <RoomSearchForm onSearch={handleSearch} initialFilters={filters} />
                </div>
            </div>
            <main className="flex flex-col min-h-screen flex flex-col mt-[120px] px-6 pb-6 bg-gray-50">

                {/* Khách sạn */}
                <h2 className="text-4xl mt-5 pt-4 mb-4 text-center font-bold h-font">Khách sạn</h2>

                <div className="flex flex-col items-center gap-6 w-full">
                    {displayedHotels.length > 0 ? (
                        displayedHotels.map((hotel) => (
                            <div key={hotel._id} className="w-full max-w-[1200px]">
                                <HotelCard hotel={hotel} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 w-full">
                            Không có khách sạn nào để hiển thị.
                        </p>
                    )}
                </div>


                {/* Nút Xem thêm / Thu gọn */}
                {hotels.length > 5 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            {showAll ? "Thu gọn" : "Xem thêm"}
                        </button>
                    </div>
                )}

                {/* Phòng */}
                <h2 className="text-4xl mt-5 pt-4 mb-4 text-center font-bold h-font">Phòng được đặt nhiều</h2>
                <div className="flex flex-col items-center gap-6 w-full">
                    {displayedRooms.length > 0 ? (
                        displayedRooms.map((room) => (
                            <div key={room._id} className="w-full max-w-[1200px]">
                                <RoomCard room={room} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 w-full">
                            Không có phòng nào để hiển thị.
                        </p>
                    )}
                </div>


                {/*Nút xem thêm */}
                {rooms.length > 5 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            {showAll ? "Thu gọn" : "Xem thêm"}
                        </button>
                    </div>
                )}

                
                <section className="bg-gray-50 py-16 px-6 md:px-20">
                    <h2 className="text-4xl font-bold text-center mb-10 h-font text-[#24305E]">Vị trí</h2>
                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {/* Google Map */}
                        <div className="md:col-span-2 rounded-xl overflow-hidden shadow-md">
                            <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4451.692605022765!2d105.78368554039413!3d21.021000780707006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab539667f4af%3A0x3c05bd36f1124029!2zSOG7mWkgTmjDoCBCw6FvIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1760012969360!5m2!1svi!2s" 
                            width="100%" 
                            height="400" 
                            allowFullScreen="" 
                            loading="lazy" 
                            className="border-0 w-full h-[400px]"
                            referrerPolicy="no-referrer-when-downgrade">
                            
                            </iframe>
                        </div>

                        {/* Thông tin liên hệ */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-xl font-semibold text-[#24305E] mb-3">
                                    Liên hệ với chúng tôi
                                </h3>
                                <div className="flex items-center text-gray-700 mb-2">
                                    <Phone size={18} className="mr-2 text-[#24305E]" />
                                    <span>0383146656</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Phone size={18} className="mr-2 text-[#24305E]" />
                                    <span>0964461742</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-xl font-semibold text-[#24305E] mb-3">Kết nối</h3>
                                <ul className="flex flex-col gap-3 text-gray-700">
                                    <li className="flex items-center gap-2 hover:text-[#24305E] cursor-pointer transition">
                                        <Facebook size={18} /> Facebook
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-[#24305E] cursor-pointer transition">
                                        <Twitter size={18} /> Twitter
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-[#24305E] cursor-pointer transition">
                                        <Music size={18} /> Tiktok
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
