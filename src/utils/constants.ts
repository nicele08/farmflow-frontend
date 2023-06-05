import {
  HiHome,
  HiShoppingBag,
  HiShoppingCart,
} from 'react-icons/hi';

export const keys = {
  ISSERVER: typeof window === 'undefined',
  DEFAULT_API: import.meta.env.VITE_PUBLIC_DEFAULT_API,
  ACCESS_TOKEN: import.meta.env.VITE_APP_ACCESS_TOKEN || 'U83*',
  THEME_KEY: import.meta.env.VITE_APP_THEME_KEY || 'theme',
  USER_KEY: import.meta.env.VITE_APP_USER_KEY || 'LKI983',
  CART_KEY: import.meta.env.VITE_APP_CART_KEY || 'KJH983',
};

export const pageLimitLabels = [
  {
    label: '5 per page',
    value: 5,
  },
  {
    label: '10 per page',
    value: 10,
  },
  {
    label: '25 per page',
    value: 25,
  },
  {
    label: '50 per page',
    value: 50,
  },
  {
    label: '100 per page',
    value: 100,
  },
];

export const sidebarNavLinks = [
  {
    label: 'Home',
    icon: HiHome,
    href: '/',
  },
  {
    label: 'Shop',
    icon: HiShoppingBag,
    href: '/shop',
  },
  {
    label: 'Orders',
    icon: HiShoppingCart,
    href: '/orders',
  },
];
