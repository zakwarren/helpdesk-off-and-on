export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const weightedRandom = (max, numDice) => {
  let num = 0;
  for (let i = 0; i < numDice; i++) {
    num += Math.random() * (max / numDice);
  }
  return Math.floor(num);
};
