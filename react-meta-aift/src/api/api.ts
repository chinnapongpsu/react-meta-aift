import client, { setConfig } from "./client";
import { ISendText } from "../interfaces/api";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const api = {
  sendText: async (requests: ISendText) => {
    setConfig({
      headers: {
        "Content-Type": "application/json",
        Apikey: `${process.env.REACT_APP_API_KEY}`,
      },
    });

    const response = await client.post(API_URL, requests);
    return response;
  },
  getVoice: async (url: string) => {
    setConfig({
      headers: {
        Apikey: `${process.env.REACT_APP_API_KEY}`,
      },
    });

    const response = await client.get(url, { responseType: "blob" });
    return response;
  },
  getBlendShapes: async (url: string) => {
    setConfig({
      headers: {
        Apikey: `${process.env.REACT_APP_API_KEY}`,
      },
    });

    const response = await client.get(url);
    return response;
  },
};

export default api;
