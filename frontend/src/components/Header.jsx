import { FaSignInAlt, FaSignOutAlt, FaUser, FaCar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <span className="pdr-4">
            <FaCar />
          </span>
          Auto Mart
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
