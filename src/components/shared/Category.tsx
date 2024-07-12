"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useSearchParams } from "next/navigation";

import { APICategory } from "@/types/data/categories.type";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
const Category = ({ categories }: { categories: APICategory[] }) => {
    const searchParams = useSearchParams();
    const [slidesPerView, setSlidesPerView] = useState(4);
    const windowSize = useWindowSize();

    const search = searchParams.get("search")
        ? "search=" + searchParams.get("search") + "&"
        : "";

    useEffect(() => {
        if (windowSize.width !== undefined) {
            if (windowSize.width <= 475 && slidesPerView !== 1)
                setSlidesPerView(1);

            if (
                windowSize.width > 475 &&
                windowSize.width <= 768 &&
                slidesPerView !== 2
            )
                setSlidesPerView(2);

            if (
                windowSize.width > 768 &&
                windowSize.width <= 1024 &&
                slidesPerView !== 3
            )
                setSlidesPerView(3);

            if (windowSize.width > 1024 && slidesPerView !== 4)
                setSlidesPerView(4);
        }
    }, [slidesPerView, windowSize.width]);

    return (
        <Swiper
            slidesPerView={slidesPerView}
            grabCursor={true}
            autoplay={{
                delay: 1000,
                pauseOnMouseEnter: true,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="py-10"
        >
            {categories &&
                categories.map((category) => (
                    <SwiperSlide key={category.id}>
                        <div className="mx-6">
                            <Link
                                href={
                                    "/products?" +
                                    search +
                                    "category=" +
                                    category.attributes.category
                                }
                                className="p-3 flex flex-col items-center gap-3 bg-green-50 hover:bg-green-600 rounded-xl transition-all group"
                            >
                                <Image
                                    src={
                                        category.attributes.image.data
                                            .attributes.url
                                    }
                                    alt={
                                        category.attributes.image.data
                                            .attributes.alternativeText ||
                                        "category"
                                    }
                                    width={50}
                                    height={50}
                                    className="group-hover:scale-125 transition-all"
                                />

                                <h5 className="font-medium text-green-800 group-hover:text-white sm:text-lg line-clamp-1 capitalize transition-all">
                                    {category.attributes.category}
                                </h5>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};

export default Category;
