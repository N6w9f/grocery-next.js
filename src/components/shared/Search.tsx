"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Search = ({
    className,
    hidden,
}: {
    className?: string;
    hidden?: string;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState("");
    const category = searchParams.get("category");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleReset = () => {
        category
            ? router.push("/products?category=" + category)
            : router.push("/products/");

        setSearch("");
    };
    const handleSubmit = () => {
        search
            ? category
                ? router.push(
                      "/products/?search=" +
                          search +
                          "&" +
                          "category=" +
                          category
                  )
                : router.push("/products?search=" + search)
            : toast.info("You should fell up the search bar");
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e?.code?.toLowerCase() === "enter") handleSubmit();
    };

    return (
        <div className={twMerge("relative", hidden)}>
            <input
                type="text"
                id="Search"
                value={search}
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder="Search for..."
                className={twMerge(
                    "w-full px-3 pe-14 py-2.5 sm:text-sm outline-green-500 rounded-md drop-shadow-md placeholder:text-slate-400",
                    className
                )}
            />

            <div className="w-10 flex items-center gap-1 absolute inset-y-0 end-3">
                <button
                    type="reset"
                    onClick={handleReset}
                    className="text-slate-400 hover:text-slate-600 transition-all"
                >
                    <HiMiniXMark className="text-xl" />
                </button>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-slate-400 hover:text-slate-600 transition-all"
                >
                    <CiSearch className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default Search;
