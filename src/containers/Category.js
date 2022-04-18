import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FlexboxLink from '../components/FlexboxLink';

function Category({ getCategory = () => ({}) }) {
  const { categoryId } = useParams();
  const data = useMemo(() => getCategory(categoryId), [categoryId]);

  if (!data) {
    return <div>Not found!</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center">
      <h2 className="text-4xl">
        {data.title}
      </h2>
      <div className="flex flex-row flex-wrap w-full">
        {data.items ? data.items.map((item, key) => (
          <FlexboxLink
            to={`/category/${categoryId}/item/${key}`}
            key={`item-box-${key}`}
          >
            {item.frontImg ? (
              <img
                style={{
                  maxHeight: '200px',
                  width: 'auto'
                }}
                src={item.frontImg}
                alt={item.title}
              />
            ) : null}
            <h2 className="text-xl font-bold mb-2 capitalize">{item.title}</h2>
          </FlexboxLink>
        )) : null}
      </div>
    </div>
  );
}

export default Category;
