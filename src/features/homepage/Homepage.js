import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FlexboxLink from '../../components/FlexboxLink';
import { useFetchHomeDataQuery } from '../../services/api';
import { DISPLAY_DEFAULT_TITLE, MEDIA_BASE_URI } from '../../shared/consts';
import getFlexWidth from '../../util/getFlexWidth';
import thumbsrc from '../../util/thumbsrc';
import { setDisplayTitle } from '../DisplayTitle/displayTitleSlice';

function Homepage() {
  const {
    data, isLoading, isSuccess, error
  } = useFetchHomeDataQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    let titleSet = false;
    if (!titleSet && isSuccess) {
      dispatch(setDisplayTitle(DISPLAY_DEFAULT_TITLE));
    }
    return () => {
      titleSet = true;
    };
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const flexWidth = getFlexWidth(data.length);

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
      }) => (
        <FlexboxLink
          to={`/category/${key}`}
          key={`category-box-${key}`}
          style={{
            flex: `1 0 ${flexWidth}%`
          }}
        >
          {thumbnail && thumbnail.src ? (
            <img
              className="rounded"
              style={{
                maxHeight: '200px',
                maxWidth: '100%'
              }}
              src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(thumbnail.src)}`}
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
