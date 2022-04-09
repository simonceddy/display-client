import { useParams } from 'react-router-dom';
import GotoItemLink from '../components/GotoItemLink';
import { getCategoryItem, getTotalItemsFor } from '../data';

function Item() {
  const { categoryId, itemId } = useParams();
  const id = Number(itemId);
  const data = getCategoryItem(categoryId, itemId);
  if (!data) {
    return <div>Not found!</div>;
  }
  const totalItems = getTotalItemsFor(categoryId);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <h2 className="text-4xl">
        {data.title}
      </h2>
      <div className="">
        {!data.media[0] ? null : (
          <img src={data.media[0]} alt={data.title} width={900} />
        )}
      </div>
      <div className="text-green-200 p-4 text-xl flex-1">
        {data.body}
      </div>
      <div className="w-full flex-row justify-start items-center p-4 border-t-2 border-green-200">
        {id > 0 ? (
          <GotoItemLink to={`/category/${categoryId}/item/${id - 1}`}>
            Previous
          </GotoItemLink>
        ) : null}
        {id < (totalItems - 1) ? (
          <GotoItemLink to={`/category/${categoryId}/item/${id + 1}`}>
            Next
          </GotoItemLink>
        ) : null}
      </div>
    </div>
  );
}

export default Item;
