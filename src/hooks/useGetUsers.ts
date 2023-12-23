import { User } from '@/types/users';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function useGetUsers() {
  return useQuery<User[], Error>('users', async () => {
    const { data } = await axios.get<User[]>('/api/users');
    return data;
  });
}