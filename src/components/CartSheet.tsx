"use client";
import { ReactNode, useMemo } from "react";
import { useAppSelector } from "@/hooks/providers/ReduxProvider.hook";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Button } from "@mui/material";
import CartListItem from "./CartListItem";

const CartSheet = ({ children }: { children: ReactNode }) => {
    const numberFormat = Intl.NumberFormat("en-us", {
        currency: "USD",
        style: "currency",
    });
    const user = useAppSelector((state) => state.user);
    const cart = useAppSelector((state) => state.cart);
    const total = useMemo(() => {
        const total_ =
            cart.length > 0
                ? cart.map((item) => {
                      return (
                          item.attributes.amount *
                          (item.attributes.product.data.attributes.price -
                              item.attributes.product.data.attributes.discount)
                      );
                  })
                : 0;

        return typeof total_ === "object" ? +eval(total_.join(" + ")) : 0.0;
    }, [cart]);

    return (
        <Sheet>
            <SheetTrigger className="relative">{children}</SheetTrigger>
            <SheetContent className="w-full sm:min-w-[600px]">
                <div className="h-full flex flex-col gap-3">
                    <SheetHeader>
                        <SheetTitle className="p-2 font-bold text-white text-lg capitalize bg-green-700">
                            My cart
                        </SheetTitle>
                    </SheetHeader>

                    <ul className="flex flex-col gap-3 overflow-auto cart_list_scrollbar">
                        {cart.map((cartItem) => (
                            <li key={cartItem.id} className="px-2">
                                <CartListItem cartItem={cartItem} />
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-2 ">
                        <h3 className="flex justify-between items-center gap-3 font-bold text-xl">
                            Subtotal
                            <span>{numberFormat.format(total)}</span>
                        </h3>

                        <Button
                            href={user?.id ? "/check-out" : "/auth"}
                            variant="contained"
                            color="success"
                            className="w-full p-3 font-bold text-sm"
                            disabled={total === 0}
                        >
                            Check out
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
