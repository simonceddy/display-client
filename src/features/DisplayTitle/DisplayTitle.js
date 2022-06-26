import { useSelector } from 'react-redux';

function DisplayTitle() {
  const title = useSelector((state) => state.displayTitle.title);
  return (
    <h1 className="text-3xl font-bold">
      {title}
    </h1>
  );
}

export default DisplayTitle;
