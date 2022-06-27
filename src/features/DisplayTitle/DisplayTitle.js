import { useSelector } from 'react-redux';

// TODO subscribe to state instad of using useEffect/dispatch
function DisplayTitle() {
  const title = useSelector((state) => state.displayTitle.title);
  return (
    <h1 className="text-3xl font-bold capitalize">
      {title}
    </h1>
  );
}

export default DisplayTitle;
