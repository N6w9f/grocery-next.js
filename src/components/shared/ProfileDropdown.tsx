"use client";
import { useAppDispatch } from "@/hooks/providers/ReduxProvider.hook";
import { removeCart_reducer } from "@/store/reducers/cart.reducer";
import { removeUser } from "@/store/reducers/user.reducer";
import cookies from "js-cookie";
import Link from "next/link";

import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const ProfileDropdown = () => {
    const dispatch = useAppDispatch();

    const [isDropdown, setIsDropdown] = useState(false);

    const handleDropdown = () => {
        setIsDropdown((prev) => !prev);
    };

    const handleLogout = async () => {
        cookies.remove("jwt");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("cart");
        dispatch(removeCart_reducer());
        dispatch(removeUser());
    };

    return (
        <div className="relative">
            <div>
                <button type="button" onClick={handleDropdown}>
                    <FaRegUserCircle className="text-green-700 text-4xl" />
                </button>

                <div
                    className={twMerge(
                        "w-64 mt-0 bg-white border border-gray-100 opacity-0 rounded-md drop-shadow-lg pointer-events-none transition-all absolute right-0 z-10",
                        isDropdown && "mt-2 opacity-100 pointer-events-auto"
                    )}
                    role="menu"
                >
                    <ul className="p-2 flex flex-col gap-1 overflow-auto dropdown_scrollbar">
                        <li className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm hover:bg-gray-50 rounded-lg">
                            <Link
                                href="/orders"
                                className="block w-full text-start text-sm"
                            >
                                My orders
                            </Link>
                        </li>

                        <li>
                            <hr className="border-red-500" />
                        </li>

                        <li className="px-4 py-2 text-red-500 hover:text-red-700 text-sm hover:bg-red-50 rounded-lg">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full text-start text-sm"
                            >
                                logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;
