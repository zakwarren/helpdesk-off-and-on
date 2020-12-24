import * as actionTypes from "./actionTypes";
import * as actions from "./player";

describe("player actions", () => {
  it("should return set username and username", () => {
    const username = "Test";
    const action = actions.setUsername(username);

    expect(action.type).toEqual(actionTypes.SET_USERNAME);
    expect(action.username).toEqual(username);
  });
});
