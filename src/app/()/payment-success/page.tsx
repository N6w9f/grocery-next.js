"use client";

import { list_ } from "@/constants/successPayment";
import { useAppDispatch } from "@/hooks/providers/ReduxProvider.hook";
import { removeCart_reducer } from "@/store/reducers/cart.reducer";
import { APIUser } from "@/types/data/auth.type";
import { APICart } from "@/types/data/cart.type";
import { addOrder, removeFromCart } from "@/utilities/APIS/groceryStoreAPIs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type pageSchema = {
    searchParams: {
        zip: string;
        address: string;
        phone: string;
        amount: string;
    };
};
const Page = ({ searchParams }: pageSchema) => {
    const numberFormat = Intl.NumberFormat("en-us", {
        currency: "USD",
        style: "currency",
    });
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const cart_: APICart[] = JSON.parse(
                // @ts-ignore
                sessionStorage.getItem("cart")
            );
            const user_: APIUser = JSON.parse(
                // @ts-ignore
                sessionStorage.getItem("user")
            );
            if (!user_ || !cart_) throw new Error("user or cart is null");
            if (cart_.length === 0)
                throw new Error("You can buy with empty cart");

            const res = await addOrder({
                userEmail: user_.email,
                userId: user_.id,
                zip: searchParams.zip,
                address: searchParams.address,
                phone: searchParams.phone,
                total: +searchParams.amount,
            });

            if (res.status !== "success") throw new Error(res.message);

            return cart_.map((cartItem) => cartItem.id);
        })()
            .then(async (IDs) => {
                for (let i = 0; i < IDs.length; i++) {
                    await removeFromCart(IDs[i]);
                }
                sessionStorage.removeItem("cart");
                dispatch(removeCart_reducer());
                router.replace("/");
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    titleText: error.message || error,
                    icon: "error",
                });
                router.replace("/");
            });
    });

    return (
        <main className="fixed_height flex flex-col justify-center items-center gap-3">
            <div className="mx-auto max-w-screen-lg bg-green-500 p-8 text-white md:flex md:items-center md:justify-around md:p-16 lg:rounded-xl">
                <div className="mr-10 mb-10 md:mb-0">
                    <h2 className="mb-8 max-w-lg text-3xl font-bold sm:text-4xl">
                        You paid {numberFormat.format(+searchParams.amount)}{" "}
                        successfully
                    </h2>
                    <ul className="flex max-w-xl flex-wrap gap-4">
                        {list_.map((listItem) => (
                            <li key={listItem.id} className="flex space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6 text-rose-300"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p className="text-gray-50">{listItem.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="whitespace-nowrap">
                    <p className="focus:outline-4 rounded-xl bg-rose-400 px-4 py-3 font-medium text-white shadow-md outline-white transition hover:bg-rose-500">
                        Don&apos;t refresh the page
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Page;
