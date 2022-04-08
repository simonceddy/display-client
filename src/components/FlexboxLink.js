import { Link } from 'react-router-dom';

function FlexboxLink({ children, to }) {
  return (
    <Link
      to={to}
      className="p-2 m-2 flex flex-col cursor-pointer justify-center items-center"
      style={{
        flex: '1 1 340px'
      }}
    >
      {children}
    </Link>
  );
}

export default FlexboxLink;
