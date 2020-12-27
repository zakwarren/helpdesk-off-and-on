import * as actionTypes from "./actionTypes";
import * as actions from "./game";

describe("game actions", () => {
  it("should return set stage and the stage", () => {
    const stage = "test";
    const action = actions.setStage(stage);

    expect(action.type).toEqual(actionTypes.SET_STAGE);
    expect(action.stage).toEqual(stage);
  });

  it("should return next day", () => {
    const action = actions.nextDay();

    expect(action.type).toEqual(actionTypes.NEXT_DAY);
  });

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
    const experience = 10;
    const patience = 50;
    const action = actions.openTicket(
      customer,
      issueType,
      issue,
      experience,
      patience
    );

    expect(action.type).toEqual(actionTypes.OPEN_TICKET);
    expect(action.ticket).toEqual({
      customer,
      issueType,
      issue,
      experience,
      patience,
    });
  });

  it("should return close ticket and the ticket", () => {
    const ticket = { id: 1 };
    const action = actions.closeTicket(ticket);

    expect(action.type).toEqual(actionTypes.CLOSE_TICKET);
    expect(action.ticket).toEqual(ticket);
  });

  it("should return fail ticket", () => {
    const ticket = { id: 1 };
    const charisma = 1;
    const action = actions.failTicket(ticket, charisma);

    expect(action.type).toEqual(actionTypes.FAIL_TICKET);
    expect(action.ticket).toEqual(ticket);
    expect(action.charisma).toEqual(charisma);
  });

  it("should return fail all open", () => {
    const action = actions.failAllOpenTickets();

    expect(action.type).toEqual(actionTypes.FAIL_ALL_OPEN);
  });

  it("should return reset tickets", () => {
    const action = actions.resetTickets();

    expect(action.type).toEqual(actionTypes.RESET_TICKETS);
  });
});
