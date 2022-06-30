import { Link } from 'react-router-dom';

function GotoItemLink({ children, to, className }) {
  return (
    <Link
      className={`${className} m-2 text-3xl font-bold bg-blue-800 bg-opacity-20 hover:bg-red-900 hover:bg-opacity-10 active:bg-yellow-700`}
      to={to}
    >
      {children}
    </Link>
  );
}

export default GotoItemLink;
