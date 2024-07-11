"use client";
const defaultS = Intl.NumberFormat("en-us");
const currencyS = Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
});

const useNumberFormatter = (
    number: number,
    type: "default" | "currency" = "default"
) => {
    const defaultT = () => defaultS.format(number);
    const currencyT = () => currencyS.format(number);

    if (type === "default") return defaultT();

    return currencyT();
};

export default useNumberFormatter;
