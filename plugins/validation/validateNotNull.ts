const validateNotNull = (input: any): boolean => {
  if (input === "" || input === null) {
    return false;
  }
  return true;
};

export default validateNotNull;
