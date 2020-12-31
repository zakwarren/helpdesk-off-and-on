import * as actionTypes from "./actionTypes";

export const resetPlayer = () => {
  return {
    type: actionTypes.RESET_PLAYER,
  };
};

export const loadPlayer = (player) => {
  return {
    type: actionTypes.LOAD_PLAYER,
    player,
  };
};

export const createPlayer = (username, manager) => {
  return {
    type: actionTypes.CREATE_PLAYER,
    username,
    manager,
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
