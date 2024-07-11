"use client";
import { APICategory } from "@/types/data/categories.type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownSchema = {
    children: ReactNode;
    parentClassName: string;
    className: string;
    options: APICategory[];
    stopScrolling?: boolean;
};
const Dropdown = ({
    children,
    parentClassName,
    className,
    options,
    stopScrolling = false,
}: DropdownSchema) => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search")
        ? "search=" + searchParams.get("search") + "&"
        : "";

    const [isDropdown, setIsDropdown] = useState(false);

    const handleDropdown = () => {
        setIsDropdown((prev) => !prev);

        stopScrolling &&
            (!isDropdown
                ? document.body.classList.add("overflow-hidden")
                : document.body.classList.remove("overflow-hidden"));
    };

    return (
        <div className={twMerge("relative", parentClassName)}>
            <div>
                <button
                    type="button"
                    onClick={handleDropdown}
                    className={className}
                    onBlur={() => {
                        setIsDropdown(false);
                    }}
                >
                    {children}
                </button>

                <div
                    className={twMerge(
                        "w-full mt-0 bg-white border border-gray-100 opacity-0 rounded-md drop-shadow-lg pointer-events-none transition-all absolute left-1/2 -translate-x-1/2 z-10",
                        isDropdown && "mt-2 opacity-100 pointer-events-auto"
                    )}
                    role="menu"
                >
                    <ul className="max-h-[152px] p-2 overflow-auto dropdown_scrollbar">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm hover:bg-gray-50 rounded-lg"
                            >
                                <Link
                                    href={
                                        "/products?" +
                                        search +
                                        "category=" +
                                        option.attributes.category
                                    }
                                    className="capitalize line-clamp-2"
                                >
                                    {option.attributes.category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
