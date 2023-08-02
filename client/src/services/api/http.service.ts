import { ACCESS_TOKEN } from './../../constants/common';
import { getCookie } from 'cookies-next';
import axios, { AxiosRequestConfig } from 'axios';
import localStorageService from '../localStorage.service';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

http.interceptors.request.use(
  async function (config: AxiosRequestConfig): Promise<any> {
    // const expiresDate = localStorageService.getTokenExpiresDate();
    // TODO refresh tokens
    // const refreshToken = localStorageService.getRefreshToken();

    // const isExpired = refreshToken && Number(expiresDate) < Date.now();
      // if (isExpired) {
      //   const data = await authService.refresh();
      //   localStorageService.setTokens(data);
      // }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
      } else {
        const token = getCookie(ACCESS_TOKEN)
        if(token) {
          config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
        }
      }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  res => {
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;