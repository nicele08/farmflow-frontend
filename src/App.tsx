import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from './utils/helpers';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './hooks/useRedux';
import { ToastContainer } from 'react-toastify';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import LogoutPage from './pages/LogoutPage';
import ShopPage from './pages/ShopPage';
import OrderPage from './pages/OrderPage';
import HomePage from './pages/HomePage';

const user = getUserData();

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    element: <Layout />,
    loader() {
      if (!user) {
        throw redirect('/auth/login');
      }
      return <div>Loading</div>;
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'logout',
        element: <LogoutPage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: '/orders',
        element: <OrderPage />,
      },
    ],
  },
  {
    path: 'auth',
    loader() {
      if (user) {
        throw redirect('/');
      }
      return <div>Loading...</div>;
    },
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { theme } = useAppSelector(state => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'system') {
      const systemTheme = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
        ? 'dark'
        : 'light';
      document.documentElement.classList.add(systemTheme);

      if (systemTheme === 'dark') {
        setMode('dark');
      }
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme={mode} />
    </>
  );
};

export default App;
