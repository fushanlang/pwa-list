const isNotNull = (input: any): boolean => {
  if (input === null) {
    return false;
  }
  return true;
};

export default isNotNull;
