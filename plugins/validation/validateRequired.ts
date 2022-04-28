const validateRequired = (property: any) => {
  if (property === "" || property === null) {
    return true;
  }
  return false;
};

export default validateRequired;
