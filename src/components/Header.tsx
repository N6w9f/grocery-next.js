"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { BsLayoutWtf } from "react-icons/bs";
import { LuShoppingBasket } from "react-icons/lu";

import { setUser } from "@/store/reducers/user.reducer";
import { setCategory } from "@/store/reducers/category.reducer";
import { Button } from "@mui/material";

import Dropdown from "@/components/shared/Dropdown";
import Search from "@/components/shared/Search";
import { nav } from "@/constants/pages";
import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/providers/ReduxProvider.hook";
import {
    getCartProducts,
    getCategories,
} from "@/utilities/APIS/groceryStoreAPIs";
import ProfileDropdown from "./shared/ProfileDropdown";
import { setCart_reducer } from "@/store/reducers/cart.reducer";

import { APIUser } from "@/types/data/auth.type";
import CartSheet from "./CartSheet";
import { usePathname } from "next/navigation";

const Header = ({
    setCategory_ = true,
    setSearch_ = true,
}: {
    setCategory_?: boolean;
    setSearch_?: boolean;
}) => {
    const path = usePathname();

    const dispatch = useAppDispatch();
    const category = useAppSelector((state) => state.category);
    const user = useAppSelector((state) => state.user);
    const cart = useAppSelector((state) => state.cart);

    const [menu, setMenu] = useState(false);

    useEffect(() => {
        (async () => {
            const isLogged = sessionStorage.getItem("user") || false;
            if (!!isLogged) {
                const parseUser: APIUser = JSON.parse(isLogged);
                dispatch(setUser(parseUser));

                const cartRes = await getCartProducts({
                    id: parseUser.id,
                    email: parseUser.email,
                });

                if (cartRes.status === "success") {
                    dispatch(setCart_reducer(cartRes.data));
                    sessionStorage.setItem(
                        "cart",
                        JSON.stringify(cartRes.data)
                    );
                }
            }
        })();

        (async () => {
            const category = await getCategories();
            dispatch(setCategory(category));
        })();
    }, [dispatch]);

    return (
        <header className="container max-sm:px-3 py-3">
            <div className="h-16  flex items-center gap-8">
                {/* logo */}
                <Link href="/" className="block text-teal-600">
                    <Image
                        src={nav.image.src}
                        alt={nav.image.alt as string}
                        width={nav.image.width}
                        height={nav.image.width}
                    />
                </Link>

                {/* links */}
                <div className="flex flex-1 justify-between items-center">
                    <div className="flex items-center gap-6">
                        {setCategory_ &&
                            category &&
                            category.status === "success" && (
                                <Dropdown
                                    options={category.data}
                                    parentClassName="max-sm:hidden"
                                    className="px-6 py-2 flex items-center gap-3 font-medium bg-slate-200 rounded-full"
                                >
                                    <BsLayoutWtf className="text-xl" />
                                    Categories
                                </Dropdown>
                            )}

                        {/* search */}
                        {setSearch_ && (
                            <Search
                                className="rounded-2xl"
                                hidden="max-md:hidden"
                            />
                        )}
                    </div>

                    {/* login and menu */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {!!user ? (
                                <>
                                    <CartSheet>
                                        <LuShoppingBasket className="text-3xl" />
                                        {cart.length > 0 && (
                                            <span className="font-bold absolute -top-3 -right-3">
                                                {"(" + cart.length + ")"}
                                            </span>
                                        )}
                                    </CartSheet>

                                    <h3 className="ms-3 font-semibold text-green-700 text-nowrap text-sm">
                                        {user?.username}
                                    </h3>
                                    <ProfileDropdown />
                                </>
                            ) : (
                                <Button
                                    type="button"
                                    className="block font-semibold text-white text-md bg-green-600 hover:bg-green-700 rounded-md transition"
                                >
                                    <Link
                                        href={
                                            path === "/"
                                                ? "/auth"
                                                : "/auth?redirect=" +
                                                  path.slice(1)
                                        }
                                        className="px-5 py-2.5"
                                    >
                                        Login
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
