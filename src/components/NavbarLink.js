import { Link } from 'react-router-dom';

function NavbarLink({ children, to }) {
  return (
    <Link
      to={to}
      className="hover:text-cyan-800 active:text-yellow-200 p-1 mx-1 bg-purple-200-op-30 hover:bg-purple-200-op-60 active:bg-cyan-400-op-75 rounded-md"
    >
      {children}
    </Link>
  );
}

export default NavbarLink;
