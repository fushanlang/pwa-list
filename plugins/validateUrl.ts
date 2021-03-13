const validateUrl = (property: string, message: string) => {
  if (property === "" || property === null) return null;

  var result = property.match(/https?/);
  const error = result === null ? [message] : null;
  return error;
};

export default validateUrl;
