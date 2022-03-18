import { create } from "apisauce";
import {API_URL, AUTH_KEY} from "../config/config";
import Storage from "../config/storage";

const api = create({
  baseURL: API_URL,
});

api.addAsyncRequestTransform(async (request) => {
  request.headers["Access-Control-Allow-Headers"] =
    "X-Requested-With, content-type, Authorization";
  request.headers["Access-Control-Allow-Methods"] =
    "GET, POST, PUT, DELETE, PATCH, OPTIONS";
  request.headers["Access-Control-Allow-Origin"] = "*";
  request.headers["Connection"] = "close";

  const authToken = await Storage.getKey(AUTH_KEY);
  if (!authToken) return;
  request.headers["Authorization"] = authToken;
});

export default api;
