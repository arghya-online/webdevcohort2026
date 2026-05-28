import axios from "axios";
import { tokenStore } from "./tokenStore";

const BASE_URl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

//axios configuration
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
