const validate = (validateMethod: any, input: any, property: string, message: string, tmpErrors: any) => {
  if (!validateMethod(input)) {
    tmpErrors[property].push(message);
    return true;
  } else {
    return false;
  }
};

export default validate;
