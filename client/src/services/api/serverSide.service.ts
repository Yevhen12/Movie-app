import axios from 'axios';

const httpService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});

const USER_ENDPOINT = 'user'

export const serverSideService = {
  getAllUsers: async (token: string) => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const { data } = await httpService.get(USER_ENDPOINT, config);
    return data;
  },

  getCurrentAccesTokenUser: async (token: string) => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const { data } = await httpService.get(`${USER_ENDPOINT}/me`, config);
    return data;
  }
}