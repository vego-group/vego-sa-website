import { baseAPI } from "..";

export const loginUserAPI = async () => await baseAPI("GET", "/user", true);
