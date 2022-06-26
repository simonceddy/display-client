import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FlexboxLink from '../../components/FlexboxLink';
import { useFetchCategoryDataQuery } from '../../services/api';
import { MEDIA_BASE_URI } from '../../shared/consts';
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
  useEffect(() => {
    let titleSet = false;
    if (!titleSet && isSuccess) {
      dispatch(setDisplayTitle(data.title));
    }
    return () => {
      titleSet = true;
    };
  }, [isLoading]);

  const baseUri = `/category/${categoryId}${subCategoryId ? `/${subCategoryId}` : ''}`;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col justify-start items-center">
      <h2 className="text-4xl capitalize">
        {data.title}
      </h2>
      <div className="flex flex-row flex-wrap w-full">
        {data.items ? data.items.map(({ key, thumbnail, title }) => (
          <FlexboxLink
            to={`${baseUri}/item/${key}`}
            key={`item-box-${key}`}
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
        {data.categories ? data.categories.map(({ key, thumbnail, title }) => (
          <FlexboxLink
            to={`/category/${categoryId}/${key}`}
            key={`item-box-${key}`}
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
