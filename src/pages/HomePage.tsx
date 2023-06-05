import { useAppSelector } from '@/hooks/useRedux';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAppSelector(state => state.auth);

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'STORE';
  return (
    <div className="grid sm:grid-cols-2 gap-5 md:gap-x-12">
      <div className="flex flex-col items-start max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Farm Flow Products
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {isAdmin
            ? `As an ${user.role.toLocaleLowerCase()} you can manage ${
                user.role === 'STORE' ? 'ordered' : 'all'
              } fertilizers and seeds products
          with single click.`
            : `As a farmer you can buy fertilizers and seeds products`}
        </p>
        <Link
          to={user?.role === 'STORE' ? '/orders' : '/shop'}
          className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isAdmin ? 'Start' : 'Buy'} Now
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>

      <div className="flex flex-col items-start max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Farm Flow Orders
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {isAdmin
            ? `As an admin you can manage orders with single click.`
            : `As a farmer you can order fertilizers and seeds products`}
        </p>
        <Link
          to={isAdmin ? '/orders' : '/shop'}
          className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Start Now
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
