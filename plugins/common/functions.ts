const setArray = (set: any, property: string) => {
  if (property !== null) set((array: Array<string>) => [...array, property]);
};

const setIfNotNull = (set: any, property: string) => {
  if (property !== null) set(property);
};

const changeFirstUpperCase = (string: string) => {
  return string.toString().charAt(0).toUpperCase() + string.slice(1);
};

export { setArray, setIfNotNull, changeFirstUpperCase };
