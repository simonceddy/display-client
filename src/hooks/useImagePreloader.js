import { useEffect, useState } from 'react';
import { useFetchThumbnailsForPreloadQuery } from '../services/api';

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function onImgLoad() {
      resolve(img);
    };
    function rejector() {
      reject(src);
    }
    img.onerror = rejector;
    img.onabort = rejector;
    img.src = src;
  });
}

export default function useImagePreloader() {
  const { data, isSuccess } = useFetchThumbnailsForPreloadQuery();
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    async function effect() {
      console.log('PRELOAD');

      if (isCancelled) {
        return;
      }

      const imagesPromiseList = [];
      if (isSuccess) {
        await Promise.all(data.map(async (i) => {
          const pl = await preloadImage(i)
            .catch((e) => console.log(e.message));
          imagesPromiseList.push(pl);
        }));

        await Promise.all(imagesPromiseList);
      }

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }
    effect();

    return () => {
      isCancelled = true;
    };
  }, [isSuccess]);

  return { imagesPreloaded };
}
