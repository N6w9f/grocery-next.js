"use client";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/providers/ReduxProvider.hook";
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
const page = ({ searchParams }: pageSchema) => {
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
            if (!user_ || !cart_) throw new Error("Something went wrong");
            if (cart_.length === 0)
                throw new Error("You can buy with empty cart");

            const productAndAmount = cart_.map((cartItem) => ({
                amount: cartItem.attributes.amount,
                product: cartItem.attributes.product.data,
            }));

            const res = await addOrder({
                userEmail: user_.email,
                userId: user_.id,
                zip: searchParams.zip,
                address: searchParams.address,
                phone: searchParams.phone,
                total: +searchParams.amount,
                productAndAmount,
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
                router.replace("/")
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    titleText: error.message || error,
                    icon: "error",
                });
                router.replace("/");
            });
    }, []);

    return (
        <main className="fixed_height flex flex-col justify-center items-center gap-3">
            <h3>You successfully sent {searchParams.amount}</h3>
        </main>
    );
};

export default page;
