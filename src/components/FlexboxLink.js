import { Link } from 'react-router-dom';

function FlexboxLink({ children, to }) {
  return (
    <Link
      to={to}
      className="p-2 m-2 flex flex-col cursor-pointer justify-between items-center hover:underline text-center border-2 rounded-md border-yellow-100 active:border-yellow-200 hover:text-red-300 active:text-yellow-200 hover:border-red-300 flexbox-item"
    >
      {children}
    </Link>
  );
}

export default FlexboxLink;
