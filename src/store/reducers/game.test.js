import * as actionTypes from "../actions/actionTypes";
import reducer from "./game";

describe("game reducer", () => {
  const initialState = {
    allNames: [],
    allIssues: {},
    allOptions: {},
    allDisasters: {},
    customer: null,
    issueType: null,
    issue: null,
  };

  it("should return the initial state when invalid type", () => {
    const newState = reducer(initialState, { type: "test" });

    expect(newState).toEqual(initialState);
  });

  it("should return the customer and issue", () => {
    const action = {
      type: actionTypes.SET_CUSTOMER,
      customer: "Test",
      issueType: "test",
      issue: "testing",
    };
    const newState = reducer(initialState, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.customer).toEqual(action.customer);
    expect(newState.issueType).toEqual(action.issueType);
    expect(newState.issue).toEqual(action.issue);
  });
});
