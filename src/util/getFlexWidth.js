function getFlexWidth(totalItems = 1) {
  // console.log(totalItems);
  const i = totalItems >= 4 ? Math.ceil(totalItems / 2) : totalItems;
  // console.log(Math.ceil(100 / i));
  return (Math.ceil(100 / i) - 4);
}

export default getFlexWidth;
