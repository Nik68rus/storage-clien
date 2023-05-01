import axios from '@/core/axios';

export const login = async (values) => {
  const { data } = await axios.post('/auth/login', values);
  return data;
};
