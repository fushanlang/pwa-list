const validateAlphanum = (property: string) => {
  if (property === "" || property === null) return null;

  var result = property.match(/^[A-Za-z0-9\s]*$/);
  console.log(result);
  const error = result === null ? true : false;
  return error;
};

export default validateAlphanum;