import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FlexboxLink from '../../components/FlexboxLink';
import { useFetchCategoryDataQuery } from '../../services/api';
import { MEDIA_BASE_URI } from '../../shared/consts';
import getFlexWidth from '../../util/getFlexWidth';
import { preloadAllMedia } from '../../util/preloadItemMedia';
import { setDisplayTitle } from '../DisplayTitle/displayTitleSlice';

function Category() {
  const { categoryId, subCategoryId } = useParams();
  const {
    data, isLoading, error, isSuccess
  } = useFetchCategoryDataQuery({
    key: categoryId,
    sub: subCategoryId || null
  });
  const dispatch = useDispatch();

  // TODO better preloading - this is mainly testing
  useEffect(() => {
    let preloadDone = false;
    if (!preloadDone && isSuccess) {
      dispatch(setDisplayTitle(data.title));
      if (data.items) preloadAllMedia(data.items);
    }
    return () => {
      preloadDone = true;
    };
  }, [isLoading]);

  const baseUri = `/category/${categoryId}${subCategoryId ? `/${subCategoryId}` : ''}`;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const totalFlexItems = (data.items ? data.items.length : 0)
    + (data.categories ? data.categories.length : 0);
  const flexWidth = getFlexWidth(totalFlexItems);
  // console.log(flexWidth);
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-row flex-wrap w-full justify-around items-center">
        {data.items ? data.items.map(({ key, thumbnail, title }) => {
          if (!key) console.log(title);
          return (
            <FlexboxLink
              to={`${baseUri}/item/${key}`}
              key={`item-box-${key}`}
              style={{
                flex: `1 1 ${flexWidth}%`
              }}
            >
              {thumbnail && thumbnail.src ? (
                <img
                  className="rounded"
                  style={{
                    maxHeight: '200px',
                    width: 'auto'
                  }}
                  src={`${MEDIA_BASE_URI}thumbs/${thumbnail.src}`}
                  alt={thumbnail.alt || title}
                />
              ) : null}
              <h2 className="text-xl font-bold mb-2 capitalize">{title}</h2>
            </FlexboxLink>
          );
        }) : null}
        {data.categories ? data.categories.map(({ key, thumbnail, title }) => (
          <FlexboxLink
            to={`/category/${categoryId}/${key}`}
            key={`item-box-${key}`}
            style={{
              flex: `1 1 ${flexWidth}%`
            }}
          >
            {thumbnail && thumbnail.src ? (
              <img
                className="rounded"
                style={{
                  maxHeight: '200px',
                  width: 'auto'
                }}
                src={`${MEDIA_BASE_URI}thumbs/${thumbnail.src}`}
                alt={thumbnail.alt || title}
              />
            ) : null}
            <h2 className="text-xl font-bold mb-2 capitalize">{title}</h2>
          </FlexboxLink>
        )) : null}
      </div>
    </div>
  );
}

export default Category;
