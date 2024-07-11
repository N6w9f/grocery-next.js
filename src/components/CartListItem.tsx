"use client";
import { APICart } from "@/types/data/cart.type";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Spinner from "./shared/Spinner";
import { removeFromCart } from "@/utilities/APIS/groceryStoreAPIs";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/providers/ReduxProvider.hook";
import { removeOneItem } from "@/store/reducers/cart.reducer";

const CartListItem = ({ cartItem }: { cartItem: APICart }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const deleteFromCart = async (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        setIsLoading(true);

        const res = await removeFromCart(cartItem.id).finally(() =>
            setIsLoading(false)
        );

        if (res.status !== "success") {
            return Swal.fire({
                title: "Something went wrong",
                titleText: res.message,
                icon: "error",
            });
        }

        dispatch(removeOneItem(cartItem.id));
    };

    return (
        <div className="flex gap-6">
            <Image
                src={
                    cartItem.attributes.product.data.attributes.image.data
                        .attributes.url
                }
                alt={
                    cartItem.attributes.product.data.attributes.image.data
                        .attributes.alternativeText || "product"
                }
                width={
                    cartItem.attributes.product.data.attributes.image.data
                        .attributes.width
                }
                height={
                    cartItem.attributes.product.data.attributes.image.data
                        .attributes.height
                }
                className="size-[125px] p-2 border object-contain"
            />

            <div className="flex flex-1 justify-between gap-3">
                <div>
                    <h4 className="font-semibold text-xl line-clamp-1">
                        {cartItem.attributes.product.data.attributes.title}
                    </h4>
                    <p className="text-lg">
                        Quantity {cartItem.attributes.amount}
                    </p>
                    <p className="font-semibold text-xl">
                        $
                        {(
                            cartItem.attributes.product.data.attributes.price -
                            cartItem.attributes.product.data.attributes.discount
                        ).toFixed(2)}
                    </p>
                </div>
                <Button
                    className="min-w-max h-fit p-2 block text-xl rounded-full"
                    color="error"
                    onClick={deleteFromCart}
                    disabled={isLoading}
                >
                    {!isLoading ? (
                        <FaTrash className="w-fit h-fit m-0 p-0 " />
                    ) : (
                        <Spinner />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CartListItem;
