import * as actionTypes from "./actionTypes";
import * as actions from "./game";

describe("game actions", () => {
  it("should return set selected ticket and the ticket", () => {
    const ticket = { id: 1 };
    const action = actions.setSelectedTicket(ticket);

    expect(action.type).toEqual(actionTypes.SET_SELECTED_TICKET);
    expect(action.ticket).toEqual(ticket);
  });

  it("should return open ticket and the ticket", () => {
    const customer = "Test";
    const issueType = "test";
    const issue = "testing";
    const action = actions.openTicket(customer, issueType, issue);

    expect(action.type).toEqual(actionTypes.OPEN_TICKET);
    expect(action.ticket).toEqual({ customer, issueType, issue });
  });

  it("should return close ticket and the ticket", () => {
    const ticket = { id: 1 };
    const action = actions.closeTicket(ticket);

    expect(action.type).toEqual(actionTypes.CLOSE_TICKET);
    expect(action.ticket).toEqual(ticket);
  });
});
