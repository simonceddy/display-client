import { Link } from 'react-router-dom';

function GotoItemLink({ children, to }) {
  return (
    <Link
      className="m-2 text-3xl font-bold"
      to={to}
    >
      {children}
    </Link>
  );
}

export default GotoItemLink;
