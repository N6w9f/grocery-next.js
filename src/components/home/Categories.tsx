"use client";
import { useAppSelector } from "@/hooks/providers/ReduxProvider.hook";

import Title from "../shared/Title";
import Category from "../shared/Category";
import { category as categoryConstants } from "@/constants/pages";
import ErrorAlert from "../shared/ErrorAlert";

const Categories = () => {
    const category = useAppSelector((state) => state.category);

    return (
        <section className="container max-sm:px-3 py-12">
            <Title className="p-0">{categoryConstants.title}</Title>

            {category &&
                (category.status === "success" ? (
                    category.data.length > 0 && (
                        <Category categories={category.data} />
                    )
                ) : (
                    <ErrorAlert statusCode={category.statusCode} message={category.message}/>
                ))}
        </section>
    );
};

export default Categories;
