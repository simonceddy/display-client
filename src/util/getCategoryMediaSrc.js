function getItemMediaSrc(item) {
  return item.media || [];
}

function getCategoryMediaSrc(category = {}) {
  const srcs = [];
  if (category.items) {
    category.items.map((i) => {
      console.log(getItemMediaSrc(i));
      return i;
    });
  }

  if (category.categories) {
    category.categories.map((c) => {
      getCategoryMediaSrc(c);
      return c;
    });
  }

  return srcs;
}

export default getCategoryMediaSrc;
