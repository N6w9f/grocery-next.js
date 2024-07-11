"use server";
import Image from "next/image";

import { banner } from "@/constants/global";
import Link from "next/link";
const Banner = () => {
    return (
        <section className="container max-sm:px-3">
            <Link
                href="/products"
                className="border rounded-3xl hover:drop-shadow-xl duration-300"
            >
                <Image
                    src={banner.src}
                    alt={banner?.alt || "banner"}
                    width={banner.width}
                    className="w-full rounded-3xl object-cover"
                />
            </Link>
        </section>
    );
};

export default Banner;
