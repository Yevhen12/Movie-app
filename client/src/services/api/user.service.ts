import httpService from './http.service';
import axios, { AxiosRequestConfig } from 'axios';
import localStorageService from '../localStorage.service';

const userEndpoint = 'user';

// const httpService = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
// });
type GetCurrentUserByAccessTokenType = {
  token: string
}

export const userService = {
  getAll: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload: any) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getById: async (id: string) => {
    const { data } = await httpService.get(userEndpoint + id);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(userEndpoint + `/${localStorageService.getUserId()}`);
    return data;
  },
  getCurrentUserByAccessToken: async ({ token }: any) => {
    const { data } = await httpService.get(userEndpoint + '/me', token);
    return data;
  }
  // updateUserData: async (payload: any) => {
  //   const { data } = await httpService.patch(userEndpoint + localStorageService.getUserId(), payload);
  //   return data;
  // },
};