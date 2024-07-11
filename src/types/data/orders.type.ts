import { APIProduct } from "./products.type";
import { APIDate, APIId, dataSchema, successSchema } from "./shared.type";


export type APIProductAndAmount = {
     id: number,
     amount: number,
     product: { data: APIProduct }
}

export type APIOrderAttributes = {
     userId: number,
     userEmail: string,
     zip: string,
     address: string,
     phone: string,
     total: number,

     productAndAmount: APIProductAndAmount[]
};


export type APIOrder = APIId & {
     attributes: APIOrderAttributes & APIDate
};



export type APIOrderSuccessSchema = successSchema<APIOrder[]>
export type APIOrderSchema = dataSchema<APIOrder[]>