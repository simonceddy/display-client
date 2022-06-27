function preloadImg(src) {
  // console.log(`Creating preload for ${src}`);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    const errHandler = () => {
      reject(src);
    };
    img.onerror = errHandler;
    img.onabort = errHandler;
    img.src = src;
  });
}

export default preloadImg;
