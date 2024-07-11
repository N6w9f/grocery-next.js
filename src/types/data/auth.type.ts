import { failedSchema } from "./shared.type"

export type APIUser = {
     blocked: boolean,
     confirmed: boolean,
     createdAt: Date,
     email: string,
     id: number,
     provider: string,
     updatedAt: Date,
     username: string,
}

export type APITokenUser = {
     jwt: string,
     user: APIUser
}

export type APIAuthSuccessSchema = {
     status: "success",
     data: APITokenUser
}


export type APIAuthSchema = APIAuthSuccessSchema | failedSchema



