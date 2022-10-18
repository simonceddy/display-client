function getFlexWidth(totalItems = 1) {
  // console.log(totalItems);
  let divisor = 1;
  if (totalItems >= 20) {
    divisor = 6;
  } else if (totalItems >= 16) {
    divisor = 5;
  } else if (totalItems >= 12) {
    divisor = 4;
  } else if (totalItems >= 8) {
    divisor = 3;
  } else if (totalItems >= 4) {
    divisor = 2;
  }

  const i = totalItems >= 4 ? Math.ceil(totalItems / divisor) : totalItems;
  // console.log(Math.ceil(100 / i));
  return (Math.ceil(100 / i) - 4);
}

export default getFlexWidth;
