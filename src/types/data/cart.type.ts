import { APIProduct } from "./products.type";
import { APIDate, APIId, dataSchema, failedSchema, successSchema } from "./shared.type";

export type APICart = APIId & {
     attributes: {
          userId: number,
          userEmail: string,
          amount: number,
          product: { data: APIProduct },

     } & APIDate
}


export type APICartSuccessSchema = {
     status: "success",
     data: APICart,
}

export type APIAddToCartSchema = APICartSuccessSchema | failedSchema

export type APICartSuccessSchemaArray = successSchema<APICart[]>
export type APICartSchema = dataSchema<APICart[]>

