import axios, { AxiosRequestConfig } from 'axios';

/**
 * 生成net对象
 * @param config axios基础配置
 * @param interceptors axios注入函数
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function generateNet(config: AxiosRequestConfig | undefined, interceptors: any) {
  const net = axios.create(config);
  interceptors(net);
  return net;
}

declare module 'axios' {
  interface AxiosInstance {
    request<T = any> (config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}
