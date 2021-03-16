const validateUrl = (property: string) => {
  if (property === "" || property === null) return null;

  var result = property.match(/https?/);
  const error = result === null ? true : false;
  return error;
};

export default validateUrl;
