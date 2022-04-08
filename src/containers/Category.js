import { useParams } from 'react-router-dom';
import FlexboxLink from '../components/FlexboxLink';
import { dataset } from '../data';

function Category() {
  const params = useParams();
  if (!dataset.categories[params.categoryId]) {
    return <div>Not found!</div>;
  }

  const data = dataset.categories[params.categoryId];

  return (
    <div className="flex flex-col justify-start items-center">
      <h2 className="text-4xl">
        {data.title}
      </h2>
      <div className="flex flex-row flex-wrap w-full">
        {data.items.map((item, key) => (
          <FlexboxLink
            to={`/category/${params.categoryId}/item/${key}`}
            key={`item-box-${key}`}
          >
            {item.title}
          </FlexboxLink>
        ))}
      </div>
    </div>
  );
}

export default Category;
