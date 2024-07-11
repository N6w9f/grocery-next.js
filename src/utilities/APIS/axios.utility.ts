import axios from "axios"

const url = process.env.DATABASE_API;
export const token = process.env.DATABASE_TOKEN;

const axiosClient = axios.create({
     baseURL: url,
     headers: {
          Authorization: "Bearer" + " " + token
     }
});

export default axiosClient;

