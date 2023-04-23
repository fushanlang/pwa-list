export default (string: string): string => {
  return string.toString().charAt(0).toUpperCase() + string.slice(1);
};
