import { destroyCookie } from 'nookies';
import {
  LoginFormDto,
  LoginResponseDto,
  RegisterFormDto,
  RegisterResponseDto,
  User,
} from './dto/auth.dto';
import axios from '@/core/axios';

export const login = async (values: LoginFormDto) => {
  return (await axios.post<LoginResponseDto>('/auth/login', values)).data;
};

export const register = async (values: RegisterFormDto) => {
  return (await axios.post<RegisterResponseDto>('/auth/register', values)).data;
};

export const getMe = async () => {
  return (await axios.get<User>('/users/me')).data;
};

export const logout = () => {
  destroyCookie(null, '_token', { path: '/' });
};
