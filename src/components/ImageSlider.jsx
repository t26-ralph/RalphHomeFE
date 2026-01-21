import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ImageSlider() {
    const slides = [
        {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            alt: "Resort view",
        },
        {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            alt: "Hotel interior",
        },
        {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            alt: "Poolside hotel",
        },
        {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            alt: "Poolsider hotel",
        },
        {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            alt: "Poolsides hotel",
        },
        {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            alt: "Poolsidez hotel",
        },
        {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            alt: "Poolsidex hotel",
        },
    ];

    return (
        <div className="w-screen h-[80vh] max-h-[90vh] overflow-hidden mb-10 rounded-none">
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            // navigation={true}
            modules={[Autoplay, Pagination]}
            className="w-full h-full">
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={slide.url}
                        alt={slide.alt}
                        className="w-screen h-full object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
}
