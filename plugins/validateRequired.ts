const validateRequired = (property: string) => {
  const error = property === "" || property === null ? true : false;
  return error;
};

export default validateRequired;
