import * as actionTypes from "./actionTypes";

export const loadPlayer = (player) => {
  return {
    type: actionTypes.LOAD_PLAYER,
    player,
  };
};

export const setUsername = (username) => {
  return {
    type: actionTypes.SET_USERNAME,
    username,
  };
};

export const addExperience = (experience) => {
  return {
    type: actionTypes.ADD_EXPERIENCE,
    experience,
  };
};

export const clearDayExperience = () => {
  return {
    type: actionTypes.CLEAR_DAY_EXPERIENCE,
  };
};
