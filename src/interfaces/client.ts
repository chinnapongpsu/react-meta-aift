export interface IConfigType {
  headers: {
    "Content-Type"?: string;
    Apikey: string;
  };
  responseType?: string;
}

export interface IBaseConfigType {
  baseURL: string;
}
