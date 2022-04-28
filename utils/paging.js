export const paging = (max, current) => {
  const array = [];

  for (let i = 0; i < max; i++) {
    array.push({
      id: i,
      number: i + 1,
      current: current === i + 1,
    });
  }

  return array;
};
