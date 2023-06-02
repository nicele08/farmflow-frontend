import Secure from '@/utils/secureLs';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    Secure.removeToken();
    window.location.href = '/auth/login';
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-100  transition-all duration-300 dark:bg-gray-900">
      <div className="bg-white  transition-all duration-300 dark:bg-gray-800 shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800  transition-all duration-300 dark:text-gray-200">
          Are you sure you want to log out?
        </h2>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Log Out
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800  transition-all duration-300 dark:text-gray-200 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
