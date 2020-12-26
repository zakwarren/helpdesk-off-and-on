import * as actionTypes from "../actions/actionTypes";
import reducer from "./game";

describe("game reducer", () => {
  const initialState = {
    allNames: [],
    allIssues: {},
    allOptions: {},
    allDisasters: {},
    maxId: 0,
    closedTickets: [],
    openTickets: [],
    selectedTicket: null,
  };

  it("should return the initial state when invalid type", () => {
    const newState = reducer(initialState, { type: "test" });

    expect(newState).toEqual(initialState);
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
    const action = { type: actionTypes.CLOSE_TICKET, ticket: { id: 1 } };
    const newState = reducer(state, action);

    expect(newState).not.toEqual(state);
    expect(newState.closedTickets).toEqual([action.ticket]);
    expect(newState.selectedTicket).toEqual(state.selectedTicket);
  });

  it("should return the closed ticket and deselect ticket", () => {
    const state = { ...initialState, selectedTicket: { id: 1 } };
    const action = { type: actionTypes.CLOSE_TICKET, ticket: { id: 1 } };
    const newState = reducer(state, action);

    expect(newState).not.toEqual(state);
    expect(newState.closedTickets).toEqual([action.ticket]);
    expect(newState.selectedTicket).toBeNull();
  });

  it("should return the open ticket", () => {
    const action = { type: actionTypes.OPEN_TICKET, ticket: { test: "test" } };
    const newState = reducer(initialState, action);

    expect(newState).not.toEqual(initialState);
    expect(newState.openTickets).toEqual([{ id: 1, ...action.ticket }]);
    expect(newState.maxId).toEqual(1);
  });

  it("should return the updated open tickets with reduced patience", () => {
    const ticket = { id: 1, patience: 50 };
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
  });
});
