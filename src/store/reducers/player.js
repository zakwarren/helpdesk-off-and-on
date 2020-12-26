import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";
import { MAX_EXPERIENCE, getSkills } from "../../shared/config";

const initialState = {
  username: "Newbie",
  level: 1,
  experience: 0,
  isManager: false,
  charisma: 50,
  chanceDisaster: 90,
  skills: {
    password: 5,
    hardware: 5,
  },
};

const bumpSkill = (currentValue) => {
  const bump = Math.floor(Math.random() * (3 - 1) + 1);
  const val = currentValue + bump || bump;
  return Math.min(val, 100);
};

const reduceChance = (currentValue) => {
  const bump = Math.floor(Math.random() * (3 - 1) + 1);
  const val = currentValue - bump || bump;
  return Math.max(val, 0);
};

const levelUp = (state, action) => {
  const level = state.level + 1;
  const experience = state.experience + action.experience - MAX_EXPERIENCE;
  const charisma = bumpSkill(state.charisma);
  const chanceDisaster = reduceChance(state.chanceDisaster);

  const unlockedSkills = getSkills(level);
  const skills = {};
  for (const s of unlockedSkills) {
    skills[s] = bumpSkill(state.skills[s]);
  }

  return updateObject(state, {
    level,
    experience,
    charisma,
    chanceDisaster,
    skills,
  });
};

const addExperience = (state, action) => {
  const exp = state.experience + action.experience;
  if (exp < MAX_EXPERIENCE) {
    return updateObject(state, {
      experience: state.experience + action.experience,
    });
  } else {
    return levelUp(state, action);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return updateObject(state, { username: action.username });
    case actionTypes.ADD_EXPERIENCE:
      return addExperience(state, action);
    default:
      return state;
  }
};

export default reducer;
