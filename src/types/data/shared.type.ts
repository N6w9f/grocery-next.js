
export type APIId = {
     id: number
}
export type APIDate = {
     createdAt?: Date,
     updatedAt?: Date,
     publishedAt?: Date,
}

export type APIImage = {
     url: string,
     alternativeText: string | null,
     width: number,
     height: number,
}

export type APIError = {
     response: {
          data: {
               error: {
                    message: string,
                    status: number
               }
          }
     }
}

export type APIMeta = {
     pagination: {
          page: number, pageSize: number, pageCount: number, total: number
     }
}



export type successSchema<data> = {
     status: "success",
     data: data,
     meta: APIMeta,
}

export type failedSchema = {
     status: "failed" | "error",
     statusCode: number,
     message: string
}

export type dataSchema<data> = successSchema<data> | failedSchema

