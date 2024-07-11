"use client";
import { Provider } from "react-redux";

import store from "@/store/store";

import type ReduxProvider from "@/types/components/providers/ReduxProvider.type";
const ReduxProvider = ({ children }: ReduxProvider) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
