const isAllowedFileSize = (fileSize: number, allowedFileSize: number): boolean => {
  return fileSize < allowedFileSize;
};

export default isAllowedFileSize;
