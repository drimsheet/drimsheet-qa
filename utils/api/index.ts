import { Api } from "./Api.ts";
import { CORE_URL } from "../../config/vars.ts";

export const drimsheetApi = new Api({
  baseURL: `${CORE_URL}/api/v1`,
  withCredentials: true,
});
