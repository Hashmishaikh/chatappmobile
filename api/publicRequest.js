import axios from "axios";
import { base_url } from "./baseurl";

axios.defaults.withCredentials = true;

export const publicRequest = axios.create({
    baseURL: base_url
});