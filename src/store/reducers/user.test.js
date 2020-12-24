import * as actionTypes from "../actions/actionTypes";
import reducer from "./user";

describe("user reducer", () => {
  const initialState = {
    username: {},
  };

  it("should return the initial state when invalid type", () => {
    const newState = reducer(initialState, { type: "test" });

    expect(newState).toEqual(initialState);
  });

  it("should set username", () => {
    const username = "test";
    const newState = reducer(initialState, {
      type: actionTypes.SET_USERNAME,
      username: username,
    });

    expect(newState.username).toEqual(username);
  });
});
