import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.jpg';

const Logo = ({ to = '/', className = 'flex' }) => {
  return (
    <Link to={to} className={className}>
      <img
        src={logo}
        className="h-8 w-8 rounded-full mr-2"
        alt="FarmFlow Logo"
      />
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
        Farm Flow
      </span>
    </Link>
  );
};

export default Logo;
