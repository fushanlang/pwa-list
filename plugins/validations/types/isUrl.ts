const isUrl = (url: string): boolean => {
  return url.match(/https?/) === null ? false : true;
};

export default isUrl;
