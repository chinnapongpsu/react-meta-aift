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
  postPathumma: async (requests: ISPathumma) => {
    const formData = new FormData();
    
    formData.append("context", "Hello");
    formData.append("prompt", requests.prompt);
    formData.append("sessionid", "1234");
    formData.append("temperature", requests.temperature.toString());

    setConfig({
      headers: {
        Apikey: `${process.env.REACT_APP_API_KEY}`,
        "X-lib": 'ai4thai-lib',
      },

    });
      const response = await client.post(`https://api.aiforthai.in.th/pathumma-chat`, formData);
      console.log(response);
      return response
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
