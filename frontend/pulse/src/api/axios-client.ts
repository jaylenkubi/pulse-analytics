import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import qs from 'qs';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_URL,
  // Add CORS headers
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { 
      arrayFormat: 'brackets', 
      encode: false,
      allowDots: true // Helps with nested objects
    })
  }
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
