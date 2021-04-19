const validateEmail = (property: string) => {
  if (property === "" || property === null) return null;

  var result = property.match(
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
  );
  const error = result === null ? true : false;
  return error;
};

export default validateEmail;
