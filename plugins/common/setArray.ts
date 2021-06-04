const setArray = (set, property) => {
  if (property !== null) set((array) => [...array, property]);
};

export default setArray;
