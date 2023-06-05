import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';

import { toggleTheme } from '@/redux/slices/themeSlice';
import Avatar from './partials/Avatar';
import { sidebarNavLinks } from '@/utils/constants';
import Logo from './partials/Logo';
import { HiLogout } from 'react-icons/hi';

const Layout = () => {
  const sidebar = React.useRef<HTMLDivElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const [toggleSidebar, setToggleSidebar] = React.useState(false);
  const { user } = useAppSelector(state => state.auth);
  const { name } = user || {};

  const dispatch = useAppDispatch();

  const { theme } = useAppSelector(state => state.theme);

  React.useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !toggleSidebar ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setToggleSidebar(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [toggleSidebar]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                ref={trigger}
                type="button"
                onClick={() => setToggleSidebar(!toggleSidebar)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Logo to="/" className="flex ml-2 md:mr-24" />
              <h1 className="hidden md:block text-xl font-semibold tracking-wide">
                Hi {name}👋
              </h1>
            </div>
            <div className="flex space-x-2 md:space-x-4 items-center">
              <Avatar />
              <Link
                to="/logout"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <HiLogout className="w-4 h-4 mr-2 -ml-1" />
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        ref={sidebar}
        className={`${
          toggleSidebar ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarNavLinks.map(link => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'text-gray-800 font-semibold bg-gray-200 dark:bg-[#475569]/40 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    } flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg`
                  }
                >
                  <link.icon
                    size={24}
                    className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700 flex flex-col">
            <li>
              <button
                id="theme-toggle"
                type="button"
                onClick={() => {
                  dispatch(toggleTheme());
                }}
                className="flex w-full items-center space-x-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
              >
                {theme !== 'dark' ? (
                  <svg
                    id="theme-toggle-dark-icon"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg
                    id="theme-toggle-light-icon"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <span>
                  {theme !== 'dark' ? 'Dark' : 'Light'} mode
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 py-20 sm:ml-64 flex flex-col">
        <h1 className="md:hidden text-xl font-semibold tracking-wide mb-4">
          Welcome {name}!
        </h1>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
