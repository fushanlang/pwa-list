const validateEmail = (char: string): boolean => {
  if (char === "" || char === null) return null;

  const result = char.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
  return result === null ? true : false;
};

export default validateEmail;
