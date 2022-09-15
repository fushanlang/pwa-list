const setErrors = (set: React.Dispatch<any>, errors: any): boolean => {
  if (Object.values(errors).flatMap((value) => value).length) {
    set(errors);
    return false;
  }
  return true;
};

export default setErrors;
