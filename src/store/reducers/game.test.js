import * as actionTypes from "../actions/actionTypes";
import reducer from "./game";
import { STAGES } from "../../shared/config";

describe("game reducer", () => {
  const initialState = {
    stage: STAGES.setup,
    day: 1,
    allNames: [],
    allIssues: {},
    allOptions: {},
    allDisasters: {},
    maxId: 0,
    closedTickets: [],
    failedTickets: [],
    openTickets: [],
    selectedTicket: null,
    message: null,
    yearData: {
      experience: 0,
      closedTickets: 0,
      failedTickets: 0,
      openTickets: 0,
    },
  };

  it("should return the initial state when invalid type", () => {
    const newState = reducer(initialState, { type: "test" });

    expect(newState).toEqual(initialState);
  });

  it("should return the stage", () => {
    const action = { type: actionTypes.SET_STAGE, stage: "test" };
    const newState = reducer(initialState, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.stage).toEqual(action.stage);
  });

  it("should increment the day", () => {
    const newState = reducer(initialState, { type: actionTypes.NEXT_DAY });

    expect(newState).not.toEqual(initialState);
    expect(newState.day).toEqual(2);
  });

  it("should return the selected ticket", () => {
    const action = {
      type: actionTypes.SET_SELECTED_TICKET,
      ticket: "test",
    };
    const newState = reducer(initialState, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.selectedTicket).toEqual(action.ticket);
  });

  it("should return the closed ticket", () => {
    const state = { ...initialState, selectedTicket: { id: 2 } };
    const action = {
      type: actionTypes.CLOSE_TICKET,
      ticket: { id: 1, experience: 1 },
    };
    const newState = reducer(state, action);

    expect(newState).not.toEqual(state);
    expect(newState.closedTickets).toEqual([action.ticket]);
    expect(newState.selectedTicket).toEqual(state.selectedTicket);
    expect(newState.message).not.toBeNull();
    expect(newState.yearData.closedTickets).toEqual(1);
  });

  it("should return the closed ticket and deselect ticket", () => {
    const state = { ...initialState, selectedTicket: { id: 1 } };
    const action = {
      type: actionTypes.CLOSE_TICKET,
      ticket: { id: 1, experience: 1 },
    };
    const newState = reducer(state, action);

    expect(newState).not.toEqual(state);
    expect(newState.closedTickets).toEqual([action.ticket]);
    expect(newState.selectedTicket).toBeNull();
    expect(newState.message).not.toBeNull();
    expect(newState.yearData.closedTickets).toEqual(1);
  });

  it("should return the open ticket", () => {
    const action = { type: actionTypes.OPEN_TICKET, ticket: { test: "test" } };
    const newState = reducer(initialState, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.openTickets).toEqual([{ id: 1, ...action.ticket }]);
    expect(newState.maxId).toEqual(1);
    expect(newState.yearData.openTickets).toEqual(1);
  });

  it("should return the updated open tickets with reduced patience when patience > 0", () => {
    const ticket = {
      id: 1,
      patience: 50,
      issueType: "test",
      customer: "Test",
      experience: 2,
    };
    const charisma = 90;
    const state = {
      ...initialState,
      openTickets: [ticket],
      selectedTicket: ticket,
    };
    const action = { type: actionTypes.FAIL_TICKET, ticket, charisma };
    const newState = reducer(state, action);

    expect(newState).not.toEqual(state);
    expect(newState.openTickets).toHaveLength(1);
    expect(newState.openTickets[0].patience).toEqual(40);
    expect(newState.selectedTicket).toBeNull();
    expect(newState.failedTickets).toHaveLength(0);
    expect(newState.message).not.toBeNull();
    expect(newState.yearData.experience).toEqual(1);
  });

  it("should return as a failed ticket when patience is <= 0", () => {
    const ticket = { id: 1, patience: 10, customer: "Test" };
    const charisma = 80;
    const state = {
      ...initialState,
      openTickets: [ticket],
      selectedTicket: ticket,
    };
    const action = { type: actionTypes.FAIL_TICKET, ticket, charisma };
    const newState = reducer(state, action);

    expect(newState).not.toEqual(state);
    expect(newState.openTickets).toHaveLength(0);
    expect(newState.selectedTicket).toBeNull();
    expect(newState.failedTickets).toHaveLength(1);
    expect(newState.failedTickets[0].id).toEqual(1);
    expect(newState.message).not.toBeNull();
    expect(newState.yearData.failedTickets).toEqual(1);
  });

  it("should move all open tickets to failed tickets", () => {
    const openTickets = ["open"];
    const failedTickets = ["failed"];
    const yearData = { failedTickets: 1 };
    const state = { ...initialState, openTickets, failedTickets, yearData };
    const newState = reducer(state, { type: actionTypes.FAIL_ALL_OPEN });

    expect(newState).not.toEqual(state);
    expect(newState.openTickets).toHaveLength(0);
    expect(newState.failedTickets).toHaveLength(2);
    expect(newState.failedTickets[0]).toEqual("failed");
    expect(newState.failedTickets[1]).toEqual("open");
    expect(newState.yearData.failedTickets).toEqual(2);
  });

  it("should return tickets to empty state", () => {
    const state = {
      ...initialState,
      maxId: 9,
      closedTickets: [{ test: "test" }],
      failedTickets: [{ test: "test 2" }],
      openTickets: [{ test: "test 3" }],
      selectedTicket: { test: "test 3" },
      message: "This is a test",
      yearData: {
        experience: 10,
        closedTickets: 10,
        failedTickets: 10,
        openTickets: 10,
      },
    };
    const newState = reducer(state, { type: actionTypes.RESET_TICKETS });

    expect(newState).not.toEqual(state);
    expect(newState.closedTickets).toHaveLength(0);
    expect(newState.failedTickets).toHaveLength(0);
    expect(newState.openTickets).toHaveLength(0);
    expect(newState.selectedTicket).toBeNull();
    expect(newState.message).toBeNull();

    expect(newState.yearData.experience).toEqual(0);
    expect(newState.yearData.closedTickets).toEqual(0);
    expect(newState.yearData.failedTickets).toEqual(0);
    expect(newState.yearData.openTickets).toEqual(0);
  });
});
