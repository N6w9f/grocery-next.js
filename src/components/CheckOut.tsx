"use client";
import { useState, useEffect, FormEvent } from "react";
import {
    useElements,
    useStripe,
    PaymentElement,
} from "@stripe/react-stripe-js";
import Spinner from "./shared/Spinner";
import { toast } from "react-toastify";

type CheckOutSchema = {
    amount: number;
    delivery: number;
    inputs: {
        phone: string;
        zip: string;
        address: string;
    };
};
const CheckOut = ({ amount, delivery, inputs }: CheckOutSchema) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch("/api/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, [amount]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!inputs.address || !inputs.phone || !inputs.zip)
            return toast.warning("fill out the blanks");

        if (!stripe || !elements) return;

        setLoading(true);

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success?amount=${
                    amount / 100
                }&phone=${inputs.phone}&address=${inputs.address}&zip=${
                    inputs.zip
                }`,
            },
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
            return;
        }
    }

    if (!stripe || !elements || !clientSecret)
        return <Spinner className="mx-auto text-3xl" />;
    return (
        <form onSubmit={onSubmit} className="p-2 bg-white rounded-md">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <button
                type="submit"
                disabled={loading || !stripe || amount === delivery}
                className="w-full mt-6 p-3 font-semibold text-xl text-white bg-black rounded-lg disabled:opacity-65 disabled:cursor-not-allowed disabled:animate-pulse"
            >
                {!loading ? "Pay" : "Processing..."}
            </button>
        </form>
    );
};

export default CheckOut;
