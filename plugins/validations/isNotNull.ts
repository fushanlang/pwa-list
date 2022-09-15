const isNotNull = (input: any): boolean => {
  if (input.trim() === "") {
    return false;
  }
  return true;
};

export default isNotNull;
