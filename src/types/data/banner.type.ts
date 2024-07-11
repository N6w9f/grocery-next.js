import { APIDate, APIId, APIImage, dataSchema, successSchema } from "./shared.type";

export type APIBanner = APIId & {
     attributes: {
          image: {
               data: {
                    attributes: APIImage & APIDate;
               };
          };
     } & APIDate;
};
export type APIBannerSuccessSchema = successSchema<APIBanner[]>
export type APIBannerSchema = dataSchema<APIBanner[]>