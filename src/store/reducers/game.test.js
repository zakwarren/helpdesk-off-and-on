import * as actionTypes from "../actions/actionTypes";
import reducer from "./game";
import { STAGES } from "../../shared/config";

describe("game reducer", () => {
  const initialState = {
    stage: STAGES.setup,
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
  });

  it("should return the open ticket", () => {
    const action = { type: actionTypes.OPEN_TICKET, ticket: { test: "test" } };
    const newState = reducer(initialState, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.openTickets).toEqual([{ id: 1, ...action.ticket }]);
    expect(newState.maxId).toEqual(1);
  });

  it("should return the updated open tickets with reduced patience when patience > 0", () => {
    const ticket = { id: 1, patience: 50, issueType: "test", customer: "Test" };
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
    };
    const newState = reducer(state, { type: actionTypes.RESET_TICKETS });

    expect(newState).not.toEqual(state);
    expect(newState.closedTickets).toHaveLength(0);
    expect(newState.failedTickets).toHaveLength(0);
    expect(newState.openTickets).toHaveLength(0);
    expect(newState.selectedTicket).toBeNull();
    expect(newState.message).toBeNull();
  });
});
