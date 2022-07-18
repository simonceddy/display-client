import { Link } from 'react-router-dom';

function GotoItemLink({ children, to, className }) {
  return (
    <Link
      className={`${className} m-2 text-3xl font-bold bg-blue-800-op-20 hover:bg-red-900-op-10 active:bg-yellow-700-op-20`}
      to={to}
    >
      {children}
    </Link>
  );
}

export default GotoItemLink;
