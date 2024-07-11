"use server";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import Title from "@/components/shared/Title";
import Product from "@/components/shared/Product";
import { product } from "@/constants/pages";
import { getProducts } from "@/utilities/APIS/groceryStoreAPIs";

const Products = async () => {
    const products = await getProducts();

    return (
        <section className="container max-sm:px-3 py-12">
            <div className="flex justify-between items-center">
                <Title>{product.title}</Title>

                <Link
                    href="/products"
                    className="flex items-center gap-1 font-medium text-green-600 hover:underline"
                >
                    All products
                    <MdKeyboardDoubleArrowRight className="mt-1 text-green-600" />
                </Link>
            </div>

            {products.status === "success" && products.data.length > 0 && (
                <Product products={products.data} />
            )}
        </section>
    );
};

export default Products;
