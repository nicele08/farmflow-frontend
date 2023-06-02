import jwtDecode from 'jwt-decode';
import Secure from './secureLs';

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
