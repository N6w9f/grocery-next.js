'use serve'
import type { APIBannerSchema, APIBannerSuccessSchema } from "@/types/data/banner.type"
import type { APICategorySchema, APICategorySuccessSchema } from "@/types/data/categories.type"
import type { APIProductSchema, APIProductSuccessSchema } from "@/types/data/products.type"
import type { APIAuthSchema, APIAuthSuccessSchema } from "@/types/data/auth.type"
import type { APIOrderAttributes, APIOrderSuccessSchema, APIOrderSchema } from "@/types/data/orders.type"

import { failedSchema } from "@/types/data/shared.type"
import { APICartSchema, APICartSuccessSchema, APICartSuccessSchemaArray } from "@/types/data/cart.type"
const errorFn = (error: any): failedSchema => ({
     status: !!error?.response ? "failed" : "error",
     statusCode: error?.response?.data?.error?.status || 500,
     message: error?.response?.data?.error?.message || "Server might be down",
});

const catchFunction = async (fn: () => Promise<any>) => await fn().catch((error: any) => errorFn(error));

// Banner
export const bannerCatcher = async (asyncFn: () => Promise<APIBannerSuccessSchema>): Promise<APIBannerSchema> =>
     await catchFunction(asyncFn);



// Category 
export const categoryCatcher = async (asyncFn: () => Promise<APICategorySuccessSchema>): Promise<APICategorySchema> =>
     await catchFunction(asyncFn);



// Product
export const productCatcher = async (asyncFn: () => Promise<APIProductSuccessSchema>): Promise<APIProductSchema> =>
     await catchFunction(asyncFn);



// Get BY
export const productsBySearch_and_Category_Catcher = async (asyncFn: () => Promise<APIProductSuccessSchema>): Promise<APIProductSchema> =>
     await catchFunction(asyncFn);




// auth 
export const login_register_catcher = async (asyncFn: () => Promise<APIAuthSuccessSchema>): Promise<APIAuthSchema> =>
     await catchFunction(asyncFn);



// should be logged in
export const getCartProductsCatcher = async (asyncFn: () => Promise<APICartSuccessSchemaArray>): Promise<APICartSchema> => await catchFunction(asyncFn);

export const add_update_cart_Catcher = async (asyncFn: () => Promise<APICartSuccessSchema>) => await catchFunction(asyncFn);
export const removeFromCartCatcher = async (asyncFn: () => Promise<{ status: "success" }>) => await catchFunction(asyncFn);



// make an order 
export const getOrdersCatcher = async (asyncFn: () => Promise<APIOrderSuccessSchema>): Promise<APIOrderSchema> => await catchFunction(asyncFn)

export const addOrderCatcher = async (asyncFn: () => Promise<APIOrderSuccessSchema>): Promise<APIOrderSchema> => await catchFunction(asyncFn);