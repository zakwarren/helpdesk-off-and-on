import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

import { NAMES, ISSUES, OPTIONS, DISASTERS } from "../data";

const initialState = {
  allNames: NAMES,
  allIssues: ISSUES,
  allOptions: OPTIONS,
  allDisasters: DISASTERS,
  maxId: 0,
  closedTickets: [],
  failedTickets: [],
  openTickets: [],
  selectedTicket: null,
};

const closeTicket = (state, action) => {
  const ticket = action.ticket;
  const openTickets = state.openTickets.filter((t) => t.id !== ticket.id);
  const closedTickets = [...state.closedTickets, ticket];

  const selectedTicket =
    state.selectedTicket.id === ticket.id ? null : state.selectedTicket;

  return updateObject(state, { openTickets, closedTickets, selectedTicket });
};

const openTicket = (state, action) => {
  const maxId = state.maxId + 1;

  const ticket = { ...action.ticket, id: maxId };
  const openTickets = [...state.openTickets, ticket];
  return updateObject(state, { openTickets, maxId });
};

const failTicket = (state, action) => {
  const patience = action.ticket.patience - (100 - action.charisma);
  const ticket = updateObject(action.ticket, { patience });
  if (patience > 0) {
    const openTickets = state.openTickets.map((t) => {
      if (t.id === ticket.id) {
        return ticket;
      } else {
        return t;
      }
    });
    return updateObject(state, { openTickets, selectedTicket: null });
  } else {
    const openTickets = state.openTickets.filter((t) => t.id !== ticket.id);
    const failedTickets = [...state.closedTickets, ticket];
    return updateObject(state, {
      openTickets,
      failedTickets,
      selectedTicket: null,
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_TICKET:
      return updateObject(state, { selectedTicket: action.ticket });
    case actionTypes.CLOSE_TICKET:
      return closeTicket(state, action);
    case actionTypes.OPEN_TICKET:
      return openTicket(state, action);
    case actionTypes.FAIL_TICKET:
      return failTicket(state, action);
    default:
      return state;
  }
};

export default reducer;
