import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FlexboxLink from '../components/FlexboxLink';
// import TransitionContainer from '../components/TransitionContainer';
// import useImagePreloader from '../hooks/useImagePreloader';
import { MEDIA_BASE_URI } from '../shared/consts';

function Category({ getCategory = () => ({}) }) {
  const { categoryId, subCategoryId } = useParams();
  const data = useMemo(() => getCategory(categoryId, subCategoryId), [categoryId, subCategoryId]);
  if (!data) {
    return <div>Not found!</div>;
  }

  // const itemList = [...data.items, ...data.categories || []];
  // console.log(itemList);

  // const { imagesPreloaded } = useImagePreloader(itemList.map((i) => i.thumbnail));

  // if (!imagesPreloaded) {
  //   return (
  //     <div>
  //       Loading media...
  //     </div>
  //   );
  // }

  const baseUri = `/category/${categoryId}${subCategoryId ? `/${subCategoryId}` : ''}`;

  return (
    <div className="flex flex-col justify-start items-center">
      <h2 className="text-4xl capitalize">
        {data.title}
      </h2>
      <div className="flex flex-row flex-wrap w-full">
        {data.items ? data.items.map((item, key) => (
          <FlexboxLink
            to={`${baseUri}/item/${key}`}
            key={`item-box-${key}`}
          >
            {item.thumbnail && item.thumbnail.src ? (
              <img
                style={{
                  maxHeight: '200px',
                  width: 'auto'
                }}
                src={`${MEDIA_BASE_URI}${item.thumbnail.src}`}
                alt={item.thumbnail.alt || item.title}
              />
            ) : null}
            <h2 className="text-xl font-bold mb-2 capitalize">{item.title}</h2>
          </FlexboxLink>
        )) : null}
        {data.categories ? data.categories.map(({ id, thumbnail, title }) => (
          <FlexboxLink
            to={`/category/${categoryId}/${id}`}
            key={`item-box-${id}`}
          >
            {thumbnail && thumbnail.src ? (
              <img
                style={{
                  maxHeight: '200px',
                  width: 'auto'
                }}
                src={`${MEDIA_BASE_URI}${thumbnail.src}`}
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
