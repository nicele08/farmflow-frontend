import { User } from '@/types/auth.type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './http';
import { toast } from 'react-toastify';

export const onLogin = createAsyncThunk(
  'auth/login',
  async (data: Pick<User, 'email' | 'password'>) => {
    try {
      const { data: authData } = await API.post('/auth/login', data);
      toast.success(`Authenticated successfully`);
      return authData;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const onRegister = createAsyncThunk(
  'auth/register',
  async (user: Pick<User, 'name' | 'email' | 'password'>) => {
    try {
      const { data } = await API.post('/auth/register', user);
      toast.success(`Authenticated successfully`);
      return data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error?.message,
      );
    }
  },
);
