const setIfNotNull = (set: any, property: string) => {
  if (property !== null) set(property);
};

export default setIfNotNull;
