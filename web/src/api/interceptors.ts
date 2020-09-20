// import { DEFAULT_NETWORK_ERROR_MSG, NETWORK_ERROR_MESSAGE_KEY } from '@/constants';
// import { message } from 'antd';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

function errorHandler(e: AxiosResponse) {
  const { data } = e;
  // if (config.autoToast) {
  //   message.error({
  //     key: NETWORK_ERROR_MESSAGE_KEY,
  //     content: data.msg || DEFAULT_NETWORK_ERROR_MSG,
  //   });
  // }
  throw data;
}

export default function interceptors(net: AxiosInstance) {
  net.interceptors.request.use(
    (conf: AxiosRequestConfig) => {
      const newConfig = conf;
      // 设置 token
      // if (!newConfig.headers.Authorization) {
      //   const { token } = useUserModel.data.user;
      //   if (token) {
      //     newConfig.headers.Authorization = `Bearer ${token}`;
      //   }
      // }
      return newConfig;
    }
  );
  net.interceptors.response.use(
    (response: AxiosResponse) => {
      // if (response.data.code === 401) {
      //   logout();
      // }
      /**
       * 可以在这里做一些response判断
       * 例如
       * 当 response.data.code === 0 resolve 等于其他值 reject
       * 取决于和后端的沟通
       */
      const r = response.data;
      if (r.code === 0) {
        return r.data;
      }
      errorHandler(response);
      return null;      
    },
    (error: AxiosResponse) => {
      /**
       * 可以在这里做一些请求错误下的判断展示
       * 例如
       * 403 提示没有权限
       * 500 提示网络错误
       */
      errorHandler(error);
      return Promise.reject(error);
    },
  );
}