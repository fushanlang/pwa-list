const isNotEmpty = (input: any): boolean => {
  if (input.trim() === "") {
    return false;
  }
  return true;
};

export default isNotEmpty;
