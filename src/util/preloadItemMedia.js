import preloadImg from './preloadImg';

export async function preloadItemMedia(item = {}) {
  if (!item.media) return null;
  try {
    await Promise.all(item.media.map(async (m) => {
      if (m.src && (!m.type || m.type === 'image')) await preloadImg(m.src);
    }));
    return true;
  } catch (err) {
    console.error(err.message, item);
    return false;
  }
}

export async function preloadAllMedia(items = []) {
  try {
    await Promise.all(items.map((i) => preloadItemMedia(i)));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default preloadItemMedia;
