import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import roomApi from "../api/roomApi";
import bookingApi from "../api/bookingApi";

export default function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [checkInDate, setCheckIn] = useState("");
    const [checkOutDate, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để đặt phòng!");
            navigate("/login");
            return;
        }

        const fetchRoom = async () => {
            try {
                const res = await roomApi.getRoom(id);
                console.log("Dữ liệu phòng trả về từ API:", res.data);
                setRoom(res.data);
            } catch (error) {
                console.error("Lỗi khi tải thông tin phòng:", error);
            }
        };
        fetchRoom();
    }, [id, navigate]);

    useEffect(() => {
        if (room && checkInDate && checkOutDate) {
            const start = new Date(checkInDate);
            const end = new Date(checkOutDate);
            const nights = (end - start) / (1000 * 60 * 60 * 24);
            if (nights > 0) setTotalPrice(nights * room.price);
            else setTotalPrice(0);
        }
    }, [checkInDate, checkOutDate, room]);

    const handleBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            alert("Vui lòng chọn ngày nhận và trả phòng!");
            return;
        }

        const today = new Date();
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate
        );

        // ❌ Kiểm tra chọn ngày trong quá khứ
        if (start < today.setHours(0, 0, 0, 0)) {
            alert("Ngày nhận phòng không thể là ngày trong quá khứ!");
            return;
        }

        // ❌ Kiểm tra ngày trả < ngày nhận
        if (end <= start) {
            alert("Ngày trả phòng phải sau ngày nhận phòng!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để đặt phòng!");
            navigate("/login");
            return;
        }

        try {
            const res = await bookingApi.create(
                {
                    roomId: room._id,
                    checkInDate,
                    checkOutDate,
                    guests,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Booking response:", res.data);
            const bookingId = res.data.booking?._id;
            if (bookingId) {
                alert("Đặt phòng thành công! Chuyển sang trang thanh toán...");
                navigate(`/payment/${bookingId}`); // ✅ chuyển qua trang thanh toán
            } else {
                alert("Không tìm thấy mã booking!");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Đặt phòng thất bại!");
        }
    };

    if (!room) return <p className="mt-24 text-center">Đang tải thông tin phòng...</p>;

    const today = new Date().toISOString().split("T")[0]; // 🟢 Giới hạn min ngày hiện tại

    return (
        <div className="max-w-5xl mx-auto mt-28 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Xác nhận đặt phòng</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 🏠 Thông tin phòng */}
                <div className="md:w-1/2">
                    <img
                        src={room.images?.[0]}
                        alt={room.name}
                        className="w-full h-[300px] object-cover rounded-xl"
                    />
                    <h2 className="text-2xl font-semibold mt-4">{room.name}</h2>
                    <p className="text-gray-600 mt-2">{room.description}</p>
                    <p className="mt-3 text-green-600 font-semibold text-lg">
                        {room.price.toLocaleString()} VND / đêm
                    </p>
                    <p className="text-gray-700 text-sm">Sức chứa: {room.maxPeople} người</p>
                </div>

                {/* 📅 Form đặt phòng */}
                <div className="md:w-1/2 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Ngày nhận phòng
                        </label>
                        <input
                            type="date"
                            value={checkInDate}
                            min={today} // 🔒 Không chọn được ngày quá khứ
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Ngày trả phòng
                        </label>
                        <input
                            type="date"
                            value={checkOutDate
                            }
                            min={checkInDate || today} // 🔒 Ngày trả không nhỏ hơn ngày nhận
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* <div>
                        <label className="block text-gray-700 font-medium mb-1">Số khách</label>
                        <input
                            type="number"
                            min={1}
                            max={room.maxPeople}
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div> */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Số khách</label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        >
                            {Array.from({ length: room.maxPeople }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? "người" : "người"}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                            Phòng tối đa {room.maxPeople} người
                        </p>
                    </div>


                    {/* 💰 Tổng tiền */}
                    <div className="mt-4 bg-gray-100 rounded-lg p-3 text-center">
                        <p className="text-gray-700 text-lg">
                            Tổng tiền:{" "}
                            <span className="font-bold text-green-600">
                                {totalPrice.toLocaleString()} VND
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={handleBooking}
                        className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                        Xác nhận đặt phòng
                    </button>
                </div>
            </div>
        </div>
    );
}
