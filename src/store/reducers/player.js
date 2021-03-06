import * as actionTypes from "../actions/actionTypes";
import { updateObject, weightedRandom } from "../../shared/utilities";
import { MAX_EXPERIENCE, getSkills, MANAGERS } from "../../shared/config";

const initialState = {
  username: "",
  level: 0,
  experience: 0,
  dayExperience: 0,
  manager: null,
  isManager: false,
  charisma: 0,
  chanceDisaster: 0,
  skills: {},
};

const createPlayer = (state, action) => {
  const manager = MANAGERS[action.manager];

  return updateObject(state, {
    username: action.username,
    level: 1,
    manager: action.manager,
    charisma: Math.min(100, weightedRandom(100, manager.charismaDie)),
    chanceDisaster: Math.min(100, weightedRandom(100, manager.charismaDie)),
    skills: {
      password: Math.min(
        100,
        weightedRandom(manager.skillMax, manager.skillDie)
      ),
    },
  });
};

const bumpSkill = (currentValue, manager) => {
  const bump = Math.floor(Math.random() * (3 - 1) + 1);
  const val =
    currentValue + bump || weightedRandom(manager.skillMax, manager.skillDie);
  return Math.min(val, 100);
};

const reduceChance = (currentValue) => {
  const bump = Math.floor(Math.random() * (3 - 1) + 1);
  const val = currentValue - bump || bump;
  return Math.max(val, 0);
};

const levelUp = (state, action) => {
  const level = state.level + 1;
  const dayExperience = state.dayExperience + action.experience;
  const experience = state.experience + action.experience - MAX_EXPERIENCE;
  const manager = MANAGERS[state.manager];
  const charisma = bumpSkill(state.charisma, manager);
  const chanceDisaster = reduceChance(state.chanceDisaster);

  const unlockedSkills = getSkills(level);
  const skills = {};
  for (const s of unlockedSkills) {
    skills[s] = bumpSkill(state.skills[s], manager);
  }

  return updateObject(state, {
    level,
    experience,
    dayExperience,
    charisma,
    chanceDisaster,
    skills,
  });
};

const addExperience = (state, action) => {
  const dayExperience = state.dayExperience + action.experience;
  const experience = state.experience + action.experience;
  if (experience < MAX_EXPERIENCE) {
    return updateObject(state, { experience, dayExperience });
  } else {
    return levelUp(state, action);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_PLAYER:
      return initialState;
    case actionTypes.LOAD_PLAYER:
      return updateObject(state, action.player);
    case actionTypes.CREATE_PLAYER:
      return createPlayer(state, action);
    case actionTypes.ADD_EXPERIENCE:
      return addExperience(state, action);
    case actionTypes.CLEAR_DAY_EXPERIENCE:
      return updateObject(state, { dayExperience: 0 });
    default:
      return state;
  }
};

export default reducer;
