import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_URL,
  // Add CORS headers
  withCredentials: true,
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export default customInstance;
