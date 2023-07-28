import { SignUpDataType, SignInDataType } from '@/dto';
import axios from 'axios';
import localStorageService from '../localStorage.service';

const LOGIN = 'login'
const SIGN_UP = 'signup'

const httpAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/`,
});

const authService = {
  signUp: async (payload: SignUpDataType) => {
    const { data } = await httpAuth.post(SIGN_UP, payload);
    return data;
  },
  signIn: async ({ username, password }: SignInDataType) => {
    const { data } = await httpAuth.post(LOGIN, {
      username,
      password,
    });
    return data;
  },
  // refresh: async () => {
  //   const { data } = await httpAuth.post('token', {
  //     grant_type: 'refresh_token',
  //     refresh_token: localStorageService.getRefreshToken(),
  //   });
  //   return data;
  // },
};

export default authService;