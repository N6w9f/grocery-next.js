"use client";

import CurrentCategory from "@/components/products/CurrentCategory";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { APIUser } from "@/types/data/auth.type";
import { APIOrderSuccessSchema } from "@/types/data/orders.type";
import { failedSchema } from "@/types/data/shared.type";
import { getOrders } from "@/utilities/APIS/groceryStoreAPIs";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import moment from "moment";
import useNumberFormatter from "@/hooks/useNumberFormatter";
import Image from "next/image";

const page = () => {
    const router = useRouter();

    const user = useMemo((): APIUser | false => {
        const user_ = JSON.parse(sessionStorage.getItem("user") || "false");

        return user_;
    }, []);
    if (!user) return router.replace("/auth?redirect=orders");

    const [orders, setOrders] = useState<
        APIOrderSuccessSchema | null | failedSchema
    >(null);

    useEffect(() => {
        (async () => {
            const res = await getOrders({
                userId: user.id,
                userEmail: user.email,
            });

            if (res.status !== "success") {
                setOrders(res);
                return;
            }

            setOrders(res);
        })();
    }, [user]);

    if (orders === null)
        return (
            <main className="container fixed_height max-sm:px-3 py-12">
                nothing to show from null
            </main>
        );

    return (
        <>
            <section>
                <CurrentCategory>My orders</CurrentCategory>
            </section>

            <main className="container fixed_height max-sm:px-3 py-12">
                {orders.status !== "success" && (
                    <ErrorAlert
                        statusCode={orders.statusCode}
                        message={orders.message}
                    />
                )}

                {orders.status === "success" &&
                    (orders.data.length === 0 ? (
                        "nothing to show from success"
                    ) : (
                        <ul>
                            {orders.data.map((order) => (
                                <li key={order.id}>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="white_green_selection px-6 font-semibold text-white text-lg bg-green-600">
                                                <ul className="w-full flex justify-between items-center gap-12">
                                                    <li>
                                                        Order date:{" "}
                                                        {moment(
                                                            order.attributes
                                                                .createdAt
                                                        ).format("DD/MM/YYYY")}
                                                    </li>
                                                    <li>
                                                        Total:{" "}
                                                        {useNumberFormatter(
                                                            order.attributes
                                                                .total,
                                                            "currency"
                                                        )}
                                                    </li>
                                                </ul>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 py-3 font-semibold text-lg bg-green-50">
                                                <ul className="flex flex-col gap-6">
                                                    {order.attributes.productAndAmount.map(
                                                        (product) => (
                                                            <li
                                                                key={product.id}
                                                                className="flex gap-12"
                                                            >
                                                                <Image
                                                                    src={
                                                                        product
                                                                            .product
                                                                            .data
                                                                            .attributes
                                                                            .image
                                                                            .data
                                                                            .attributes
                                                                            .url
                                                                    }
                                                                    alt={
                                                                        product
                                                                            .product
                                                                            .data
                                                                            .attributes
                                                                            .image
                                                                            .data
                                                                            .attributes
                                                                            .alternativeText ||
                                                                        "product"
                                                                    }
                                                                    width={
                                                                        product
                                                                            .product
                                                                            .data
                                                                            .attributes
                                                                            .image
                                                                            .data
                                                                            .attributes
                                                                            .width
                                                                    }
                                                                    height={
                                                                        product
                                                                            .product
                                                                            .data
                                                                            .attributes
                                                                            .image
                                                                            .data
                                                                            .attributes
                                                                            .height
                                                                    }
                                                                    className="size-16 object-contain"
                                                                />

                                                                <h3 className="w-56 flex flex-col gap-1">
                                                                    {
                                                                        product
                                                                            .product
                                                                            .data
                                                                            .attributes
                                                                            .title
                                                                    }
                                                                    <span>
                                                                        price:{" "}
                                                                        {useNumberFormatter(
                                                                            product
                                                                                .product
                                                                                .data
                                                                                .attributes
                                                                                .price -
                                                                                product
                                                                                    .product
                                                                                    .data
                                                                                    .attributes
                                                                                    .discount,
                                                                            "currency"
                                                                        )}
                                                                    </span>
                                                                </h3>
                                                                <div className="flex flex-1 justify-between">
                                                                    <p>
                                                                        Quantity:{" "}
                                                                        {
                                                                            product.amount
                                                                        }
                                                                    </p>

                                                                    <p>
                                                                        Total:{" "}
                                                                        {useNumberFormatter(
                                                                            product.amount *
                                                                                (product
                                                                                    .product
                                                                                    .data
                                                                                    .attributes
                                                                                    .price -
                                                                                    product
                                                                                        .product
                                                                                        .data
                                                                                        .attributes
                                                                                        .discount),
                                                                            "currency"
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </li>
                            ))}
                        </ul>
                    ))}
            </main>
        </>
    );
};

export default page;
