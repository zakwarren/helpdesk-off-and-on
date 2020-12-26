import * as actionTypes from "../actions/actionTypes";
import reducer from "./player";

describe("player reducer", () => {
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

  it("should return the initial state when invalid type", () => {
    const newState = reducer(initialState, { type: "test" });

    expect(newState).toEqual(initialState);
  });

  it("should set username", () => {
    const username = "test";
    const newState = reducer(initialState, {
      type: actionTypes.SET_USERNAME,
      username,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.username).toEqual(username);
  });

  it("should add experience but not level up", () => {
    const experience = 10;
    const newState = reducer(initialState, {
      type: actionTypes.ADD_EXPERIENCE,
      experience,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.experience).toEqual(initialState.experience + experience);
    expect(newState.level).toEqual(initialState.level);
  });

  it("should add experience and level up", () => {
    const experience = 110;
    const newState = reducer(initialState, {
      type: actionTypes.ADD_EXPERIENCE,
      experience,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.experience).toEqual(10);
    expect(newState.level).toEqual(initialState.level + 1);

    expect(newState.charisma).toBeGreaterThan(initialState.charisma);
    expect(newState.chanceDisaster).toBeLessThan(initialState.chanceDisaster);
    expect(newState.skills.password).toBeGreaterThan(
      initialState.skills.password
    );
    expect(newState.skills.hardware).toBeGreaterThan(
      initialState.skills.hardware
    );
  });
});
