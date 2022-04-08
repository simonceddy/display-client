import { Link, useParams } from 'react-router-dom';
import { dataset } from '../data';

function Item() {
  const { categoryId, itemId } = useParams();
  const id = Number(itemId);
  if (!dataset.categories[categoryId]
    || !dataset.categories[categoryId].items[itemId]
  ) {
    return <div>Not found!</div>;
  }
  const data = dataset.categories[categoryId].items[itemId];
  const totalItems = dataset.categories[categoryId].items.length;
  return (
    <div className="flex flex-col w-full justify-start items-center">
      <h2 className="text-4xl">
        {data.title}
      </h2>
      <div className="flex-1">
        {!data.media[0] ? null : (
          <img src={data.media[0]} alt={data.title} width={900} />
        )}
      </div>
      <div>
        {data.body}
      </div>
      {id > 0 ? (
        <Link to={`/category/${categoryId}/item/${id - 1}`}>
          Previous
        </Link>
      ) : null}
      {id < (totalItems - 1) ? (
        <Link to={`/category/${categoryId}/item/${id + 1}`}>
          Next
        </Link>
      ) : null}
    </div>
  );
}

export default Item;
