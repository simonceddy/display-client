/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FlexboxLink from '../../components/FlexboxLink';
import { useFetchHomeDataQuery } from '../../services/api';
// import TransitionContainer from '../components/TransitionContainer';
// import useImagePreloader from '../hooks/useImagePreloader';
import { MEDIA_BASE_URI } from '../../shared/consts';
import { setDisplayTitle } from '../DisplayTitle/displayTitleSlice';

function Homepage() {
  const {
    data, isLoading, isSuccess, error
  } = useFetchHomeDataQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    let titleSet = false;
    if (!titleSet && isSuccess) {
      dispatch(setDisplayTitle('Wonthaggi & District Historical Society'));
    }
    return () => {
      titleSet = true;
    };
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // const { imagesPreloaded } = useImagePreloader(categories.map((c) => c.thumbnail));

  // if (!imagesPreloaded) {
  //   return (
  //     <div>
  //       Loading media...
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-row flex-wrap justify-evenly items-start w-full p-2">
      {data.map(({
        title, thumbnail, key
      }, index) => (
        <FlexboxLink
          to={`/category/${key}`}
          key={`category-box-${key}`}
        >
          {thumbnail && thumbnail.src ? (
            <img
              className="rounded"
              style={{
                maxHeight: '200px',
                maxWidth: '100%'
              }}
              src={`${MEDIA_BASE_URI}thumbs/${thumbnail.src}`}
              alt={thumbnail.alt || title}
            />
          ) : null}
          <h2 className="text-xl font-bold mb-2 capitalize">{title}</h2>
          {/* <p className="italic">Contains {items.length} items</p> */}
        </FlexboxLink>
      ))}
    </div>

  );
}

export default Homepage;
