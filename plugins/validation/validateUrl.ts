const validateUrl = (url: string) => {
  if (url === "" || url === null) return null;
  const result = url.match(/https?/);
  return result === null ? true : false;
};

export default validateUrl;
