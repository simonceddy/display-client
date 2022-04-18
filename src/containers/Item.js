import { useMemo } from 'react';
import {
  BiLeftArrowCircle as PreviousIcon,
  BiRightArrowCircle as NextIcon
} from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import GotoItemLink from '../components/GotoItemLink';
import ItemMedia from '../components/ItemMedia';

const iconSize = 40;

function Item({ getItemFrom = () => ({}) }) {
  const { categoryId, itemId } = useParams();
  const id = Number(itemId);
  const data = useMemo(() => getItemFrom(categoryId, itemId), [categoryId, itemId]);
  if (!data.media) {
    return <div>Not found!</div>;
  }

  const totalItems = data.totalItems || 0;

  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div className="h-full w-40 p-4">
        {id > 0 ? (
          <GotoItemLink to={`/category/${categoryId}/item/${id - 1}`}>
            <PreviousIcon size={iconSize} />
          </GotoItemLink>
        ) : null}
      </div>
      <div className="flex-1 flex flex-col w-full h-full justify-start items-center">
        <h2 className="text-4xl">
          {data.title}
        </h2>
        <div className="">
          {!data.media[0] ? null : (
            <ItemMedia src={data.media[0]} alt={data.title} type="video" />
          )}
        </div>
        <div className="text-green-200 p-4 text-xl flex-1">
          {data.body}
        </div>
      </div>
      <div className="h-full w-40 p-4">
        {id < (totalItems - 1) ? (
          <GotoItemLink to={`/category/${categoryId}/item/${id + 1}`}>
            <NextIcon size={iconSize} />
          </GotoItemLink>
        ) : null}
      </div>
    </div>
  );
}

export default Item;
