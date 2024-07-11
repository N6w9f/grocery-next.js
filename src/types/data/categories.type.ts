import { APIId, APIDate, dataSchema, successSchema } from "./shared.type";


export type APICategory = APIId & {
     attributes: {
          category: string,
          image: {
               data: {
                    attributes: {
                         url: string,
                         alternativeText: string,
                         width: number,
                         height: number,
                    } & APIDate
               }
          }
     } & APIDate
}

export type APICategorySuccessSchema = successSchema<APICategory[]>
export type APICategorySchema = dataSchema<APICategory[]>

