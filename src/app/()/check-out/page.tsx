"use client";
import CurrentCategory from "@/components/products/CurrentCategory";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "@/hooks/providers/ReduxProvider.hook";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import useFormatter from "@/hooks/useNumberFormatter";

import centsChange from "@/utilities/cents";
import CheckOut from "@/components/CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
if (!publicKey) {
    throw new Error("Public key is undefined");
}

const stripePromise = loadStripe(publicKey);

const page = () => {
    const tax = 9;
    const delivery = 15;
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const router = useRouter();
    const [inputs, setInputs] = useState({
        phone: "",
        zip: "",
        address: "",
    });

    const cart = useAppSelector((state) => state.cart);
    const subTotal = useMemo(() => {
        const subTotal_ = cart.map(
            (item) =>
                item.attributes.amount *
                (item.attributes.product.data.attributes.price -
                    item.attributes.product.data.attributes.discount)
        );

        const subTotal__: number = eval(subTotal_.join("+")) || 0;
        return subTotal__;
    }, [cart]);
    const totalWithTax = useMemo(() => {
        if (subTotal < 0) return 0.0;

        const withTax_ = +((tax / 100) * subTotal).toFixed(2);
        return withTax_;
    }, [subTotal, tax]);
    const total = useMemo(() => {
        return subTotal + totalWithTax + delivery;
    }, [subTotal, totalWithTax, delivery]);

    const inputsOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const phoneOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isValid = numbers.some(
            (num) => num === +e.currentTarget.value.slice(-1)
        );
        isValid &&
            setInputs((prev) => ({
                ...prev,
                phone: e.currentTarget.value,
            }));
    };

    useEffect(() => {
        stripePromise.catch(() => {});

        !sessionStorage.getItem("user") &&
            router.push("/auth?redirect=check-out");
    });

    return (
        <>
            <CurrentCategory>Check out</CurrentCategory>

            <main className="container max-sm:px-3 py-12 flex max-xl:flex-col justify-between max-xl:gap-12 gap-24">
                {/* form */}
                <form className="w-full flex flex-col justify-between gap-8">
                    <h2 className="font-bold text-3xl capitalize">
                        Billing details
                    </h2>

                    <div className="flex flex-col gap-3">
                        <TextField
                            label="Phone"
                            variant="standard"
                            color="success"
                            className="flex-1"
                            value={inputs.phone}
                            onChange={phoneOnChange}
                            required={true}
                        />

                        <div className="flex items-center gap-6">
                            <TextField
                                label="Zip"
                                name="zip"
                                variant="standard"
                                color="success"
                                className="flex-1"
                                value={inputs.zip}
                                onChange={inputsOnChange}
                                required={true}
                            />
                            <TextField
                                label="Address"
                                name="address"
                                variant="standard"
                                color="success"
                                className="flex-1"
                                value={inputs.address}
                                onChange={inputsOnChange}
                                required={true}
                            />
                        </div>
                    </div>
                </form>

                {/* payment */}

                <div className="w-full xl:max-w-[450px] min-h-max h-fit max-h-fit outline_auto outline-4 outline-gray-200 rounded-sm">
                    <h3 className="p-3 font-bold text-center text-2xl bg-gray-200">
                        Total cart {"(" + cart.length + ")"}
                    </h3>

                    <div className="p-6 flex flex-col gap-3">
                        <h3 className="flex justify-between items-center gap-3 font-bold text-xl">
                            Subtotal:
                            <span>{useFormatter(subTotal, "currency")}</span>
                        </h3>

                        <hr />

                        <h3 className="flex justify-between items-center gap-3 font-medium text-xl">
                            Delivery:
                            <span>{useFormatter(delivery, "currency")}</span>
                        </h3>
                        <h3 className="flex justify-between items-center gap-3 font-medium text-xl">
                            Tax ({tax}%):
                            <span>
                                {useFormatter(totalWithTax, "currency")}
                            </span>
                        </h3>

                        <hr />
                        <h3 className="flex justify-between items-center gap-3 font-bold text-xl">
                            Total:
                            <span>{useFormatter(total, "currency")}</span>
                        </h3>

                        <Elements
                            stripe={stripePromise}
                            options={{
                                mode: "payment",
                                amount: centsChange(total),
                                currency: "usd",
                            }}
                        >
                            <CheckOut
                                amount={centsChange(total)}
                                delivery={centsChange(delivery)}
                                inputs={inputs}
                            />
                        </Elements>
                    </div>
                </div>
            </main>
        </>
    );
};

export default page;
