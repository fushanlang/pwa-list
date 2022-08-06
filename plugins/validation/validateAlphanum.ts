const validateAlphanum = (char: string): boolean => {
  return char.match(/^[A-Za-z0-9-\s.]*$/) === null ? false : true;
};

export default validateAlphanum;
