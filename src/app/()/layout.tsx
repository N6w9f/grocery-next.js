import { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            <ReduxProvider>
                <Header setSearch_={false} setCategory_={false} />

                {children}

                <Footer />
            </ReduxProvider>
        </>
    );
};

export default layout;
