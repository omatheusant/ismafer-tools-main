import { User } from '@/types/users';
import axios from 'axios';



export default function getUsers(): Promise<User[]> {
  return axios.get<User[]>('/api/users')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}