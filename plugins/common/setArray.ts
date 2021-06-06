const setArray = (set: any, property: string) => {
  if (property !== null) set((array: Array<string>) => [...array, property]);
};

export default setArray;
