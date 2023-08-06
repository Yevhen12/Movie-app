import httpService from './http.service';
import axios, { AxiosRequestConfig } from 'axios';
import localStorageService from '../localStorage.service';
import { IUser } from '@/types/types';
import { SignUpDataType } from '@/dto';

const userEndpoint = 'user';

type GetCurrentUserByAccessTokenType = {
  token: string
}

export const userService = {
  getAll: async () => {
    const { data } = await httpService.get<IUser[]>(userEndpoint);
    return data;
  },
  create: async (payload: SignUpDataType) => {
    const { data } = await httpService.post<IUser>(userEndpoint, payload);
    return data;
  },
  getById: async (id: string) => {
    const { data } = await httpService.get<IUser>(userEndpoint + id);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get<IUser>(userEndpoint + `/${localStorageService.getUserId()}`);
    return data;
  },
  // getCurrentUserByAccessToken: async (payload: GetCurrentUserByAccessTokenType) => {
  //   const { data } = await httpService.get<IUser>(userEndpoint + '/me', payload.token);
  //   return data;
  // }
  // updateUserData: async (payload: any) => {
  //   const { data } = await httpService.patch(userEndpoint + localStorageService.getUserId(), payload);
  //   return data;
  // },
};