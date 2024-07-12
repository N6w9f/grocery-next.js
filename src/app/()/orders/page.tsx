"use client";

import CurrentCategory from "@/components/products/CurrentCategory";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { APIUser } from "@/types/data/auth.type";
import { APIOrderSuccessSchema } from "@/types/data/orders.type";
import { failedSchema } from "@/types/data/shared.type";
import { getOrders } from "@/utilities/APIS/groceryStoreAPIs";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import moment from "moment";
import NoData from "@/components/NoData";
import { useAppSelector } from "@/hooks/providers/ReduxProvider.hook";

const Page = () => {
    const numberFormat = Intl.NumberFormat("en-us", {
        currency: "USD",
        style: "currency",
    });
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const [orders, setOrders] = useState<
        APIOrderSuccessSchema | null | failedSchema
    >(null);

    useEffect(() => {
        if (!user) return;

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
    }, [router, user]);

    if (orders === null)
        return (
            <>
                <section>
                    <CurrentCategory>My orders</CurrentCategory>
                </section>

                <main className="container fixed_height max-sm:px-3 py-12 flex justify-center items-center">
                    <NoData />
                </main>
            </>
        );

    return (
        <>
            <section>
                <CurrentCategory>My orders</CurrentCategory>
            </section>

            <main className="container fixed_height max-sm:px-3 py-12 flex justify-center items-center">
                {orders.status !== "success" && (
                    <ErrorAlert
                        statusCode={orders.statusCode}
                        message={orders.message}
                    />
                )}

                {orders.status === "success" &&
                    (orders.data.length === 0 ? (
                        <>
                            <NoData />
                        </>
                    ) : (
                        <table className="w-full mb-auto">
                            <thead className="white_green_selection">
                                <tr className="bg-green-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                    <th className="px-5 py-3">ID</th>
                                    <th className="max-[440px]:hidden px-5 py-3">
                                        User Email
                                    </th>
                                    <th className="px-5 py-3 max-lg:hidden">
                                        Zip
                                    </th>
                                    <th className="max-sm:hidden px-5 py-3">
                                        Address
                                    </th>
                                    <th className="max-[850px]:hidden px-5 py-3">
                                        Date
                                    </th>
                                    <th className="px-5 py-3">Total</th>
                                    <th className="px-5 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">
                                {orders.data.map((order) => (
                                    <tr key={order.id}>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap line-clamp-1">
                                                {order.id}
                                            </p>
                                        </td>
                                        <td className="max-[440px]:hidden border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap line-clamp-1">
                                                {order.attributes.userEmail}
                                            </p>
                                        </td>
                                        <td className="max-lg:hidden border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap line-clamp-1">
                                                {order.attributes.zip}
                                            </p>
                                        </td>
                                        <td className="max-sm:hidden border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap line-clamp-1">
                                                {order.attributes.address}
                                            </p>
                                        </td>
                                        <td className="max-[850px]:hidden border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap line-clamp-1">
                                                {moment(
                                                    order.attributes
                                                        .createdAt || new Date()
                                                ).format("LLL")}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap line-clamp-1">
                                                {numberFormat.format(
                                                    order.attributes.total
                                                )}
                                            </p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <span className="rounded-full bg-purple-200 px-3 py-1 text-xs text-center font-semibold text-black line-clamp-1">
                                                pending
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
            </main>
        </>
    );
};

export default Page;
