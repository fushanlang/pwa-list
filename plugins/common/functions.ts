const changeFirstUpperCase = (string: string) => {
  return string.toString().charAt(0).toUpperCase() + string.slice(1);
};

export { changeFirstUpperCase };
