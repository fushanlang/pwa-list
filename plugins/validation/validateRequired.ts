const validateRequired = (input: any): boolean => {
  if (input === "" || input === null) {
    return true;
  }
  return false;
};

export default validateRequired;
