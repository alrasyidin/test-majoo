import axios from "axios"

export const API = axios.create({
  baseURL: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0",
})
