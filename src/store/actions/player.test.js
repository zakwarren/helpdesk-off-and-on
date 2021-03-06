import * as actionTypes from "./actionTypes";
import * as actions from "./player";

describe("player actions", () => {
  it("should return reset player", () => {
    const action = actions.resetPlayer();

    expect(action.type).toEqual(actionTypes.RESET_PLAYER);
  });

  it("should return load player and player data", () => {
    const player = { test: "test" };
    const action = actions.loadPlayer(player);

    expect(action.type).toEqual(actionTypes.LOAD_PLAYER);
    expect(action.player).toEqual(player);
  });

  it("should return create player and player data", () => {
    const username = "Test";
    const manager = "Tester";
    const action = actions.createPlayer(username, manager);

    expect(action.type).toEqual(actionTypes.CREATE_PLAYER);
    expect(action.username).toEqual(username);
    expect(action.manager).toEqual(manager);
  });

  it("should return add experience and experience", () => {
    const experience = 10;
    const action = actions.addExperience(experience);

    expect(action.type).toEqual(actionTypes.ADD_EXPERIENCE);
    expect(action.experience).toEqual(experience);
  });

  it("should return clear day experience", () => {
    const action = actions.clearDayExperience();

    expect(action.type).toEqual(actionTypes.CLEAR_DAY_EXPERIENCE);
  });
});
