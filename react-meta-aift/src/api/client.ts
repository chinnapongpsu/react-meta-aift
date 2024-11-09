import axios from "axios";

import { IBaseConfigType, IConfigType } from "../interfaces/client";

const baseConfig: IBaseConfigType = {
  baseURL: `${process.env.REACT_APP_API_URL}`,
};

const client = axios.create(baseConfig);

let configHeaders: IConfigType["headers"] | null = null;

// Function to set custom headers
export const setConfig = (config: IConfigType) =>
  (configHeaders = config.headers);

// Add a request interceptor
client.interceptors.request.use(
  (request) => {
    if (configHeaders && request.headers) {
      request.headers["Content-Type"] = configHeaders["Content-Type"];
      request.headers["Apikey"] = configHeaders["Apikey"];
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export default client;
