"use client";
import Image from "next/image";

import ProductDetails from "../ProductDetails";

import type { APIProduct } from "@/types/data/products.type";
import ReduxProvider from "../providers/ReduxProvider";
const Product = ({ products }: { products: APIProduct[] }) => {
    return (
        <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="p-6 flex flex-col items-center gap-3 text-bold bg-white border rounded-lg hover:scale-105 transition-all"
                    >
                        <Image
                            src={product.attributes.image.data.attributes.url}
                            alt={
                                product.attributes.image.data.attributes
                                    .alternativeText || "product"
                            }
                            width={
                                product.attributes.image.data.attributes.width
                            }
                            height={
                                product.attributes.image.data.attributes.height
                            }
                            className="w-[200px] h-[200px] object-contain"
                        />
                        <h3>{product.attributes.title}</h3>
                        {/* price & total */}
                        <div className="flex items-center gap-2">
                            {/* price - total */}
                            <p>
                                $
                                {product.attributes.price -
                                    product.attributes.discount}
                            </p>

                            {/* old price */}
                            {product.attributes.discount > 0 && (
                                <span className="text-slate-400 line-through">
                                    ${product.attributes.price}
                                </span>
                            )}
                        </div>

                        {/* Add to cart */}
                        <ReduxProvider>
                            <ProductDetails product={product} />
                        </ReduxProvider>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Product;
