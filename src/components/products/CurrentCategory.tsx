import React, { ReactNode } from "react";

const CurrentCategory = ({ children }: { children: ReactNode }) => {
    return (
        <div className="white_green_selection text-center bg-green-600">
            <h2 className="mx-auto py-4 font-bold text-white text-4xl capitalize tracking-[0.2em] leading-normal">
                {children}
            </h2>
        </div>
    );
};

export default CurrentCategory;
