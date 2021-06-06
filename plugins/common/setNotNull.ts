const setNotNull = (set: any, property: string) => {
  if (property !== null) set(property);
};

export default setNotNull;
