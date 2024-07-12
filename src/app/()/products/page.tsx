"use client";
import { useState, useEffect } from "react";

import CurrentCategory from "@/components/products/CurrentCategory";
import Category from "@/components/shared/Category";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useAppSelector } from "@/hooks/providers/ReduxProvider.hook";
import { getProductsBySearch_and_Category } from "@/utilities/APIS/groceryStoreAPIs";

import { APIProductSchema } from "@/types/data/products.type";
import Product from "@/components/shared/Product";
import Search from "@/components/shared/Search";

const Page = ({
    searchParams: { category = "all", search = "all" },
}: {
    searchParams: { search?: string; category?: string };
}) => {
    const categoryData = useAppSelector((state) => state.category);
    const [products, setProducts] = useState<APIProductSchema | null>(null);

    useEffect(() => {
        (async () => {
            setProducts(
                await getProductsBySearch_and_Category(search, category)
            );
        })();
    }, [search, category]);

    return (
        <>
            <CurrentCategory>{category.replaceAll("-", "&")}</CurrentCategory>

            {/* search */}
            <section className="container max-sm:px3 pt-6">
                <Search />
            </section>

            {/* categories */}
            <section className="container max-sm:px-3 py-12">
                {categoryData &&
                    (categoryData.status === "success" ? (
                        <Category categories={categoryData.data} />
                    ) : (
                        <ErrorAlert
                            statusCode={categoryData.statusCode}
                            message={categoryData.message}
                        />
                    ))}
            </section>

            {/* products */}
            <section className="container max-sm:px-3 py-12">
                {products &&
                    (products.status === "success" ? (
                        <Product products={products.data} />
                    ) : (
                        <ErrorAlert
                            statusCode={products.statusCode}
                            message={products.message}
                        />
                    ))}
            </section>
        </>
    );
};

export default Page;
