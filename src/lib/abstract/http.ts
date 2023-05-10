import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  type AxiosReponse<T> = Promise<T>;
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  public baseURL: string;

  public constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private _handleResponse = (data: AxiosResponse) => data;

  protected _handleError = (error: Error) => Promise.reject(error);
}

export default HttpClient;
