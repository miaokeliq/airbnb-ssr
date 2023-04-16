import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const defaultConfig = {
  timeout: 5000,
  baseUrl: "",
};
class Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static axiosInstance = axios.create(defaultConfig);
  private httpInterceptorsRequest() {
    // 请求拦截
    Http.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  private httpInterceptorsResponse() {
    // 响应拦截
    Http.axiosInstance.interceptors.response.use(
      (config: AxiosResponse) => {
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  // 封装请求
  public httpRequestGet<T>(
    url: string,
    params: InternalAxiosRequestConfig
  ): Promise<T> {
    return Http.axiosInstance
      .get(url, params)
      .then((res) => res.data)
      .catch();
  }

  // post
  public httpRequestPost<T>(
    url: string,
    params: InternalAxiosRequestConfig
  ): Promise<T> {
    return Http.axiosInstance
      .post(url, params)
      .then((res) => res.data)
      .catch();
  }
}

export const http = new Http();
