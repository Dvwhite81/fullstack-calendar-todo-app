import { Link } from 'react-router-dom';

import { UserType } from '../../utils/types';

import LogOutBtn from './LogOutBtn';

interface NavbarProps {
  loggedInUser: UserType | null;
  handleLogOut: () => void;
}

const Navbar = ({ loggedInUser, handleLogOut }: NavbarProps) => {
  return (
    <nav id="navbar">
      {loggedInUser ? (
        <>
          <Link className="link nav-link" to="/agenda">
            Agenda
          </Link>
          <Link className="link nav-link" to="/">
            Home
          </Link>
          <LogOutBtn handleLogOut={handleLogOut} />
        </>
      ) : (
        <>
          <Link className="link nav-link" to="/register">
            Sign Up
          </Link>
          <Link className="link nav-link" to="/login">
            Log In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
