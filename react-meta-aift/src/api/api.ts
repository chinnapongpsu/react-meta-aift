import client, { setConfig } from "./client";
import { ISendText, ISPathumma } from "../interfaces/api";

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
  getPathuma: async (requests: ISPathumma) => {
    const formData = new FormData();
    
    formData.append("context", requests.context);
    formData.append("prompt", requests.prompt);
    formData.append("sessionid", requests.sessionid);
    formData.append("temperature", requests.temperature.toString());

    setConfig({
      headers: {
        Apikey: `${process.env.REACT_APP_API_KEY}`,
        "X-lib": 'ai4thai-lib',
        accept: 'application/json'
      },

    });

    const response = await client.post(`${process.env.REACT_APP_PATHUMMA_URL}`, formData);
    return response;
  },
};

export default api;
