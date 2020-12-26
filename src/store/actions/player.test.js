import * as actionTypes from "./actionTypes";
import * as actions from "./player";

describe("player actions", () => {
  it("should return set username and username", () => {
    const username = "Test";
    const action = actions.setUsername(username);

    expect(action.type).toEqual(actionTypes.SET_USERNAME);
    expect(action.username).toEqual(username);
  });

  it("should return add experience and experience", () => {
    const experience = 10;
    const action = actions.addExperience(experience);

    expect(action.type).toEqual(actionTypes.ADD_EXPERIENCE);
    expect(action.experience).toEqual(experience);
  });
});
