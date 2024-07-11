"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Types
import { APIBanner } from "@/types/data/banner.type";

const ImageSlider = ({
    banners,
    className,
    loop = false,
    autoplay = false,
    slidesPerView = 1,
    spaceBetween = 0,
}: {
    banners: APIBanner[];
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
    slidesPerView?: number;
    spaceBetween?: number;
}) => {
    return (
        <Swiper
            loop={loop}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            grabCursor={true}
            autoplay={{
                delay: 1250,
                pauseOnMouseEnter: true,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="rounded-xl"
        >
            {banners?.map((banner, index) => (
                <SwiperSlide key={index}>
                    <div>
                        <Image
                            quality={100}
                            src={banner.attributes.image.data.attributes.url}
                            alt={
                                banner.attributes.image.data.attributes
                                    .alternativeText || "banner"
                            }
                            width={
                                banner.attributes.image.data.attributes.width
                            }
                            height={
                                banner.attributes.image.data.attributes.height
                            }
                            className={className}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
