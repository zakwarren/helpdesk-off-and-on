export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
