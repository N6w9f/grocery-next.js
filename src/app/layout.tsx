// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Next.js
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
const cairo = Outfit({
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

import "./globals.css";
import { twMerge } from "tailwind-merge";
import ReduxProvider from "@/components/providers/ReduxProvider";
export const metadata: Metadata = {
    title: {
        default: "Grocery Store",
        template: "%s | Grocery Store",
    },
    description: "Buy while you're at home",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={twMerge(
                    cairo.className,
                    "body_scrollbar green_selection"
                )}
            >
                <ToastContainer stacked position="top-right" />
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
