const validate = (validateMethod: any, input: any, property: string, message: string, errors: any): void => {
  if (!validateMethod(input)) {
    errors[property].push(message);
    return;
  } else {
    return;
  }
};

export default validate;
