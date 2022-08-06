const validateUrl = (url: string): boolean => {
  return url.match(/https?/) === null ? false : true;
};

export default validateUrl;
