import { LoginFormDto, LoginResponseDto } from './dto/auth.dto';
import axios from '@/core/axios';

export const login = async (values: LoginFormDto) => {
  return (await axios.post<LoginResponseDto>('/auth/login', values)).data;
};
