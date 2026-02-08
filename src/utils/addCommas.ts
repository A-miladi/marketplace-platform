export const addCommas = (value: string) => {
  const number = value.replace(/,/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
