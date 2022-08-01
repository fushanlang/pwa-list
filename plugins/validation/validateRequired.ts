const validateRequired = (input: any) => {
  if (input === "" || input === null) {
    return true;
  }
  return false;
};

export default validateRequired;
