const validateAlphanum = (char: string): boolean => {
  if (char === "" || char === null) return false;
  const result = char.match(/^[A-Za-z0-9-\s.]*$/);
  const error = result === null ? true : false;
  return error;
};

export default validateAlphanum;
