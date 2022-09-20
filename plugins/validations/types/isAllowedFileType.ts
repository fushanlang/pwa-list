const isAllowedFileType = (fileType: string, allowedFileTypes: string[]): boolean => {
  return allowedFileTypes.some((allowedFileType: string) => fileType === allowedFileType);
};

export default isAllowedFileType;
