/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useFetchItemsKeysQuery } from '../services/api';

function useNextPrevItem(itemKey, categoryKey, subCategoryKey = null) {
  const { data, isSuccess, error } = useFetchItemsKeysQuery({
    key: categoryKey,
    sub: subCategoryKey || null
  });
  const [vals, setVals] = useState({
    next: null,
    prev: null
  });

  useEffect(() => {
    let init = false;
    if (!init && isSuccess) {
      const idx = data.findIndex((i) => i.key === itemKey);
      console.log(data);
      if (typeof idx !== 'number') {
        throw new Error(`
could not locate item key ${itemKey} in ${categoryKey}${subCategoryKey ? `/${subCategoryKey}` : ''}
        `);
      }
      const nextItem = () => {
        if (!data) {
          return itemKey;
        }
        let newIndex;
        if (idx <= 0) {
          newIndex = data.length - 1;
        } else {
          newIndex = idx - 1;
        }
        return data[newIndex];
      };
      const prevItem = () => {
        if (!data) {
          return itemKey;
        }
        let newIndex;
        if (idx >= data.length - 1) {
          newIndex = 0;
        } else {
          newIndex = idx + 1;
        }
        return data[newIndex];
      };

      setVals({
        next: nextItem(),
        prev: prevItem()
      });
    }
    return () => {
      init = true;
    };
  }, [isSuccess]);

  return {
    ...vals
  };
}

export default useNextPrevItem;
