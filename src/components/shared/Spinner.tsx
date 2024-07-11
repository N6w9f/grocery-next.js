import React from "react";
import { PiSpinnerThin } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

const Spinner = ({ className }: { className?: string }) => {
    return (
        <div>
            <PiSpinnerThin
                className={twMerge("text-2xl animate-spin", className)}
            />
        </div>
    );
};

export default Spinner;
