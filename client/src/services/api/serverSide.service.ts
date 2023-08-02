import axios from 'axios';

const httpService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});

export const serverSideService = {
  getAllUsers: async (token: string) => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const { data } = await httpService.get('user', config);
    return data;
  },
}