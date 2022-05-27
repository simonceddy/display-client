import { useMemo } from 'react';
import {
  BiLeftArrowCircle as PreviousIcon,
  BiRightArrowCircle as NextIcon
} from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import GotoItemLink from '../components/GotoItemLink';
import ItemMedia from '../components/ItemMedia';
import { MEDIA_BASE_URI } from '../shared/consts';

const iconSize = 40;

function Item({ getItemFrom = () => ({}) }) {
  const { categoryId, itemId, subCategoryId } = useParams();
  const id = Number(itemId);
  const data = useMemo(
    () => getItemFrom(categoryId, itemId, subCategoryId),
    [categoryId, itemId, subCategoryId]
  );
  if (!data.media) {
    return <div>Not found!</div>;
  }

  const totalItems = data.totalItems || 0;

  const baseUri = `/category/${categoryId}${subCategoryId ? `/${subCategoryId}` : ''}`;

  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div className="h-full flex flex-col justify-center items-start w-40 p-4">
        {id > 0 ? (
          <GotoItemLink className="h-full w-4/5 rounded-md p-2 items-start flex flex-col justify-center" to={`${baseUri}/item/${id - 1}`}>
            <PreviousIcon size={iconSize} />
          </GotoItemLink>
        ) : null}
      </div>
      <div className="flex-1 flex flex-col w-full h-full justify-start items-center">
        <h2 className="text-4xl capitalize">
          {data.title}
        </h2>
        <div className="">
          {!data.media[0] ? null : (
            <ItemMedia src={`${MEDIA_BASE_URI}${data.media[0]}`} alt={data.title} type="image" />
          )}
        </div>
        <div className="text-green-200 p-4 text-xl flex-1">
          {data.body}
        </div>
      </div>
      <div className="h-full flex flex-col justify-center items-end w-40 p-4">
        {id < (totalItems - 1) ? (
          <GotoItemLink
            className="h-full w-4/5 rounded-md p-2 items-end flex flex-col justify-center"
            to={`${baseUri}/item/${id + 1}`}
          >
            <NextIcon size={iconSize} />
          </GotoItemLink>
        ) : null}
      </div>
    </div>
  );
}

export default Item;
