import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const httpClient = axios.create({
  timeout: 10000,
});

const baseHttpClientQuery =
  () =>
  async <R, D>(config: AxiosRequestConfig<D>) => {
    try {
      const response = await httpClient.request<R>(config);
      return { data: response.data };
    } catch (e) {
      const reason = typeof e === 'string' ? e : (e as AxiosError)?.message;
      return { error: reason || 'unknown http client query error' };
    }
  };

export default baseHttpClientQuery;
