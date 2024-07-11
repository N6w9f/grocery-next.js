"use client";
import Image from "next/image";

import { ChangeEvent, LegacyRef, MouseEvent, useRef, useState } from "react";
import { FaEquals } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import { Button } from "@mui/material";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/providers/ReduxProvider.hook";
import { APIProduct } from "@/types/data/products.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "./shared/Spinner";
import { addToCart } from "@/utilities/APIS/groceryStoreAPIs";
import {
    addToCart_reducer,
    setCart_reducer,
} from "@/store/reducers/cart.reducer";
const ProductDetails = ({ product }: { product: APIProduct }) => {
    const limit = 100;

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const cart = useAppSelector((state) => state.cart);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(1);
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const router = useRouter();

    const onIncrease = () => {
        amount < limit
            ? setAmount((prev) => prev + 1)
            : toast.error("The highest you can do is 100");
    };
    const onDecrease = () => {
        amount > 1 && setAmount((prev) => prev - 1);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        // see if the value is valid [because in input with type number client can write dots(.) and we don't want dots(.)]
        const validation = number.some(
            (e2) => e2 === +e.target.value.slice(-1)
        );
        validation &&
            (+e.target.value > 0 // if client deleted all number it will returns empty string and when i converted to number it becomes 0
                ? +e.target.value <= limit
                    ? setAmount(+e.target.value)
                    : toast.error("The highest you can do is 100")
                : setAmount(1));
    };

    const handleAddToCart = async (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        setIsLoading(true);
        if (user?.id) {
            const res = await addToCart({
                userId: user.id,
                userEmail: user.email,
                amount: amount,
                product: product,
            }).finally(() => {
                setIsLoading(false);
            });

            res.status === "success" && dispatch(addToCart_reducer(res.data));
            sessionStorage.setItem("cart", JSON.stringify(cart));

            setAmount(1);
            document.getElementById("close_now")?.click();
        } else
            router.push("/auth", {
                scroll: false,
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="reset"
                    variant="outlined"
                    color="success"
                    size="small"
                    className="font-semibold"
                    startIcon={<MdOutlineAddShoppingCart />}
                >
                    Add to cart
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:w-[90%] max-w-[750px] p-12 outline_auto outline-4 rounded-lg ">
                <DialogClose id="close_now" />
                <div className="flex items-center gap-3">
                    <Image
                        src={product.attributes.image.data.attributes.url}
                        alt={
                            product.attributes.image.data.attributes
                                .alternativeText || "product"
                        }
                        width={product.attributes.image.data.attributes.width}
                        height={product.attributes.image.data.attributes.height}
                        className="min-w-[300px] max-w-[300px] min-h-[320px] max-h-[320px] object-contain"
                    />

                    <div className="flex flex-col gap-3">
                        <DialogTitle>{product.attributes.title}</DialogTitle>
                        <DialogDescription>
                            {product.attributes.description}
                        </DialogDescription>

                        {/* price */}
                        <div className="flex items-center gap-3 font-bold text-3xl">
                            <p>
                                $
                                {product.attributes.price -
                                    product.attributes.discount}
                            </p>
                            {product.attributes.discount > 0 && (
                                <span className="text-slate-400 line-through">
                                    ${product.attributes.price}
                                </span>
                            )}
                        </div>

                        {/* quantity */}
                        <p className="font-semibold text-lg">
                            Quantity ({product.attributes.quantity})
                        </p>

                        {/* pricing */}
                        <div className="flex items-center gap-2">
                            {/* set quantity */}
                            <div className="w-fit">
                                <div className="flex items-center rounded border border-gray-200">
                                    <button
                                        type="button"
                                        onClick={onDecrease}
                                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="text"
                                        id="Quantity"
                                        value={amount}
                                        onChange={handleOnChange}
                                        min={1}
                                        max={100}
                                        className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={onIncrease}
                                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* total */}
                            <FaEquals />
                            <span className="font-bold text-2xl">
                                $
                                {(
                                    (product.attributes.price -
                                        product.attributes.discount) *
                                    amount
                                ).toFixed(2)}
                            </span>
                        </div>

                        {/* add to cart */}
                        <Button
                            onClick={handleAddToCart}
                            startIcon={<MdOutlineAddShoppingCart />}
                            variant="contained"
                            color="success"
                            className="w-fit px-3 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : "Add to cart"}
                        </Button>
                        {/* category */}
                        <p className="font-bold text-[14px]">
                            Category:{" "}
                            <span className="text-gray-600">
                                {
                                    product.attributes.category.data.attributes
                                        .category
                                }
                            </span>
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetails;
