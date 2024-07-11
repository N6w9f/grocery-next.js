import { APIId, APIDate, dataSchema, APIImage, successSchema } from "./shared.type";

export type APIProduct = APIId & {
     attributes: {
          title: string, description: string, quantity: string,
          price: number, discount: number,
          category: { data: { attributes: { category: string } } },
          image: {
               data: {
                    attributes: APIImage
               }
          }
     } & APIDate
}

export type APIProductSuccessSchema = successSchema<APIProduct[]>
export type APIProductSchema = dataSchema<APIProduct[]>

