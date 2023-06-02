import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import Logo from '@/components/partials/Logo';
import { onLogin } from '@/api/auth.api';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(onLogin(credentials));
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full p-4 md:p-8">
      <div className="flex items-center justify-center mb-8">
        <Logo to="/auth/login" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-sm w-full bg-white  transition-all duration-300 dark:bg-gray-950 rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Sign in to Farm Flow
        </h2>

        <div className="my-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={credentials.email || ''}
            onChange={handleChangeInput}
            className="w-full border bg-white border-gray-300 outline-none p-2 rounded-lg  transition-all duration-300 dark:bg-slate-800 dark:border-slate-900"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password || ''}
            onChange={handleChangeInput}
            className="w-full border border-gray-300 bg-white outline-none p-2 rounded-lg  transition-all duration-300 dark:bg-slate-800 dark:border-slate-900"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="disabled:cursor-not-allowed mt-4 opacity-70 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg  transition-all duration-300 dark:bg-blue-800 dark:hover:bg-blue-600"
        >
          Sign in
        </button>

        <div className="flex justify-between items-center mt-4">
          <Link
            to="/auth/register"
            className="text-blue-500 hover:text-blue-600"
          >
            First time? Register here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
