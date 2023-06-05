import SecureLS from 'secure-ls';
import { keys } from './constants';
import { User } from '@/types/auth.type';
import { Product } from '@/types/product.type';

const ls = new SecureLS({ encodingType: 'aes' });

const setToken = (value: string) => {
  ls.set(keys.ACCESS_TOKEN, value);
};

const getToken = () => {
  try {
    return ls.get(keys.ACCESS_TOKEN) as string;
  } catch (error) {
    return null;
  }
};

const removeAll = () => {
  ls.removeAll();
};

const setUser = (value: User) => {
  ls.set(keys.USER_KEY, value);
};

const getUser = () => {
  try {
    return ls.get(keys.USER_KEY) as User;
  } catch (error) {
    return null;
  }
};

const setTheme = (value: string) => {
  ls.set(keys.THEME_KEY, value);
};

const getTheme = () => {
  try {
    return (
      (ls.get(keys.THEME_KEY) as 'light' | 'dark' | 'system') ||
      'system'
    );
  } catch (error) {
    return 'system';
  }
};

const removeToken = () => {
  ls.remove(keys.ACCESS_TOKEN);
};

const getCart = () => {
  try {
    return (ls.get(keys.CART_KEY) as Product[]) || [];
  } catch (error) {
    return [];
  }
};

const setCart = (cart: Product[]) => {
  ls.set(keys.CART_KEY, cart);
};

const clearCart = () => {
  ls.remove(keys.CART_KEY);
};

const Secure = {
  ls,
  setToken,
  removeToken,
  getToken,
  setUser,
  getUser,
  setTheme,
  getTheme,
  removeAll,
  setCart,
  getCart,
  clearCart,
};

export default Secure;
