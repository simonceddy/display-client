import { useEffect } from 'react';
import {
  BiLeftArrowCircle as PreviousIcon,
  BiRightArrowCircle as NextIcon
} from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import GotoItemLink from '../../components/GotoItemLink';
import ItemMedia from '../../components/ItemMedia';
import { useFetchItemDataQuery } from '../../services/api';
import { MEDIA_BASE_URI } from '../../shared/consts';
import { setDisplayTitle } from '../DisplayTitle/displayTitleSlice';

function Item() {
  const { categoryId, itemId, subCategoryId } = useParams();
  const dispatch = useDispatch();
  const {
    data, error, isLoading, isSuccess
  } = useFetchItemDataQuery({
    key: categoryId,
    item: itemId,
    sub: subCategoryId || null
  });

  useEffect(() => {
    let titleSet = false;
    if (!titleSet && isSuccess) {
      dispatch(setDisplayTitle(data.title));
    }
    return () => {
      titleSet = true;
    };
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const baseUri = `/category/${categoryId}${subCategoryId ? `/${subCategoryId}` : ''}`;

  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div className="h-full flex flex-col justify-center items-start w-32 p-4">
        {data.prev ? (
          <GotoItemLink className="h-full w-4/5 rounded-md p-2 items-start flex flex-col justify-center" to={`${baseUri}/item/${data.prev}`}>
            <PreviousIcon size={50} />
          </GotoItemLink>
        ) : null}
      </div>
      <div className="flex-1 flex flex-col w-full h-full justify-start items-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          {data.media[0] && data.media[0].src ? (
            <ItemMedia
              src={`${MEDIA_BASE_URI}${data.media[0].src}`}
              alt={data.media[0].src || data.title}
              type={data.media[0].type || 'image'}
            />
          ) : null}
        </div>
        <div className="text-green-200 p-4 mb-4 text-xl">
          {data.body}
        </div>
      </div>
      <div className="h-full flex flex-col justify-center items-end w-32 p-4">
        {data.next ? (
          <GotoItemLink
            className="h-full w-4/5 rounded-md p-2 items-end flex flex-col justify-center"
            to={`${baseUri}/item/${data.next}`}
          >
            <NextIcon size={50} />
          </GotoItemLink>
        ) : null}
      </div>
    </div>
  );
}

export default Item;
