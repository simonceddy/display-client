import { useEffect, useState } from 'react';
import { MEDIA_BASE_URI } from '../shared/consts';
import preloadImg from '../util/preloadImg';

function useImagePreloader(imageList = []) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  useEffect(() => {
    let cancelled = false;

    async function effect() {
      if (cancelled) {
        return;
      }

      const imagesPromiseList = [];
      imageList.map((i) => imagesPromiseList.push(
        preloadImg(`${MEDIA_BASE_URI}${i}`)
      ));

      await Promise.all(imagesPromiseList);

      if (cancelled) {
        return;
      }
      setImagesPreloaded(true);
    }

    effect();

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagesPreloaded };
}

export default useImagePreloader;
