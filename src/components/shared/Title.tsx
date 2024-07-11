import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Title = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    const classes = "py-6 text-green-600 font-bold capitalize text-2xl";
    return <h3 className={twMerge(classes, className)}>{children}</h3>;
};

export default Title;
