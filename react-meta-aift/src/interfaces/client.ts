export interface IConfigType {
  headers: {
    "Content-Type"?: string;
    Apikey: string;
    accept?: string;
    "X-lib"?: string;
  };
  responseType?: string;
}

export interface IBaseConfigType {
  baseURL: string;
}
