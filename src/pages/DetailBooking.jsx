import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import roomApi from "../api/roomApi";
import bookingApi from "../api/bookingApi";

export default function RoomDetailPage() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [dates, setDates] = useState({ checkIn: "", checkOut: "" });

    useEffect(() => {
        const fetchRoom = async () => {
            const res = await roomApi.getRoom(id);
            setRoom(res.data);
        };
        fetchRoom();
    }, [id]);

    const handleChange = (e) =>
        setDates({ ...dates, [e.target.name]: e.target.value });

    const handleBooking = async () => {
        try {
            await bookingApi.create({ roomId: id, ...dates });
            alert("Đặt phòng thành công!");
        } catch (err) {
            alert(err.response?.data?.message || "Lỗi đặt phòng");
        }
    };

    if (!room) return <p>Đang tải...</p>;

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">{room.name}</h1>
            <p className="mt-2">Giá: {room.price} VND/đêm</p>
            <p>Sức chứa: {room.maxPeople} người</p>
            <p className="mt-2">{room.description}</p>

            <div className="mt-4 flex flex-col gap-2">
                <label>
                    Check-in:
                    <input
                        type="date"
                        name="checkIn"
                        value={dates.checkIn}
                        onChange={handleChange}
                        className="border p-2 ml-2"
                    />
                </label>
                <label>
                    Check-out:
                    <input
                        type="date"
                        name="checkOut"
                        value={dates.checkOut}
                        onChange={handleChange}
                        className="border p-2 ml-2"
                    />
                </label>
            </div>

            <button
                onClick={handleBooking}
                className="mt-4 bg-green-600 text-white py-2 px-4"
            >
                Đặt phòng
            </button>
        </div>
    );
}
