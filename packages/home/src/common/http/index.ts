import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTP_TIME_OUT } from '../../constants';

function Http() {
  let axiosInstance: AxiosInstance | null = null;

  const initialize = () => {
    axiosInstance = axios.create({
      timeout: HTTP_TIME_OUT,
    });
  };

  function request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>) {
    if (!axiosInstance) {
      throw new Error('please using http initialize first !!!');
    }
    return axiosInstance.request<T, R, D>(config);
  }

  return {
    initialize,
    request,
    get current() {
      return axiosInstance;
    },
  };
}

const http = Http();

export default http;
