import jwtDecode from 'jwt-decode';
import Secure from './secureLs';
import { Product } from '@/types/product.type';

export const getUserData = (
  token: string | null = Secure.getToken(),
) => {
  if (!token) return null;
  try {
    const jwt: { exp: number } = jwtDecode(token);
    const now = new Date();
    if (now.getTime() > jwt.exp * 1000) {
      Secure.removeToken();
      return null;
    }
    return Secure.getUser();
  } catch (error) {
    return null;
  }
};

export const isObjectValid = (obj: Record<string, any>) => {
  return Object.values(obj).every(value => {
    if (typeof value === 'string') {
      return value !== '';
    } else if (typeof value === 'number') {
      return !isNaN(value);
    }
    return true;
  });
};

export const calculateProductQuantity = (
  landSize: number,
  product: Product,
) => {
  const { maxPerAcre, perAcre } = product;

  const maxProductQuantity = maxPerAcre * Math.ceil(landSize);

  const quantity = Math.min(maxProductQuantity, landSize * perAcre);

  return {
    quantity,
    maxQuantity: maxProductQuantity,
  };
};
