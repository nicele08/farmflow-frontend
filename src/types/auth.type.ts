import { InitialState } from './state.type';

export type Role = 'ADMIN' | 'USER' | 'STORE';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState extends InitialState {
  user: User | null;
}
