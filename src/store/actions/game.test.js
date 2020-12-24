import * as actionTypes from "./actionTypes";
import * as actions from "./game";

describe("game actions", () => {
  it("should return set customer and customer, issue type and issue", () => {
    const customer = "Test";
    const issueType = "test";
    const issue = "testing";
    const action = actions.setCustomer(customer, issueType, issue);

    expect(action.type).toEqual(actionTypes.SET_CUSTOMER);
    expect(action.customer).toEqual(customer);
    expect(action.issueType).toEqual(issueType);
    expect(action.issue).toEqual(issue);
  });
});
