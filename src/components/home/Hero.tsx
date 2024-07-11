"use server";
import React from "react";

import ImageSlider from "../shared/ImageSlider";
import { getBanners } from "@/utilities/APIS/groceryStoreAPIs";

const Hero = async () => {
    const getBanners_ = async () => await getBanners();
    const banners = await getBanners_();
    return (
        <main className="container max-sm:px-3 py-12 ">
            {banners.status === "success" && (
                <ImageSlider
                    loop={true}
                    autoplay={true}
                    banners={banners.data}
                    className="w-full h-52 sm:h-72 lg:h-96 object-cover"
                />
            )}
        </main>
    );
};

export default Hero;
