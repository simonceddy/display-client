import { useParams } from 'react-router-dom';
import FlexboxLink from '../components/FlexboxLink';
import { getCategory } from '../data';

function Category() {
  const params = useParams();
  const data = getCategory(params.categoryId);
  if (!data) {
    return <div>Not found!</div>;
  }

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
