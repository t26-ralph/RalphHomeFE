import About from "../assets/About.jpg"
export default function AboutPage() {
    return (
        <div className="max-w-6xl mx-auto mt-28 px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Về chúng tôi</h1>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Ảnh minh họa */}
                <div className="md:w-1/2">
                    <img
                        src={About}
                        alt="Giới thiệu"
                        className="rounded-2xl w-full object-cover shadow-lg"
                    />
                </div>

                {/* Nội dung */}
                <div className="md:w-1/2 space-y-4 text-gray-700">
                    <p>
                        Chúng tôi là nền tảng đặt phòng trực tuyến hàng đầu, giúp bạn tìm kiếm các khách sạn,
                        homestay, và phòng nghỉ phù hợp với nhu cầu và ngân sách của mình.
                    </p>
                    <p>
                        Với giao diện thân thiện, thanh toán an toàn, và đội ngũ hỗ trợ 24/7,
                        chúng tôi cam kết mang đến trải nghiệm đặt phòng nhanh chóng và tiện lợi nhất.
                    </p>
                    <p>
                        Sứ mệnh của chúng tôi là kết nối khách hàng với những nơi lưu trú chất lượng,
                        đồng thời hỗ trợ chủ khách sạn quản lý và quảng bá phòng hiệu quả.
                    </p>
                </div>
            </div>
        </div>
    );
}