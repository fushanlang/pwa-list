const isNotNull = (input: any): boolean => {
  if (input === null || input.trim() === "") {
    return false;
  }
  return true;
};

export default isNotNull;
