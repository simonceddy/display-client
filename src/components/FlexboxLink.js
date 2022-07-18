import { Link } from 'react-router-dom';

function FlexboxLink({ children, to, style }) {
  return (
    <Link
      to={to}
      className="py-2 px-3 m-2 flex flex-col cursor-pointer justify-between items-center hover:underline text-center border-2 rounded-md border-yellow-100 active:border-yellow-200 hover:text-gray-100 active:text-yellow-200 hover:border-gray-100 flexbox-item bg-purple-200-op-40 hover:bg-purple-600-op-40"
      style={style}
    >
      {children}
    </Link>
  );
}

export default FlexboxLink;
