import { Link } from 'react-router-dom';

function NavbarLink({ children, to }) {
  return (
    <Link
      to={to}
      className="hover:text-red-300 active:text-yellow-200"
    >
      {children}
    </Link>
  );
}

export default NavbarLink;
