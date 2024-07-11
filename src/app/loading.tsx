import Spinner from "@/components/shared/Spinner";
import React from "react";

const loading = () => {
    return (
        <div className="w-screen h-dvh flex justify-center items-center">
            <Spinner className="text-9xl" />
        </div>
    );
};

export default loading;
