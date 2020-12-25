import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

import { NAMES, ISSUES, OPTIONS, DISASTERS } from "../data";

const initialState = {
  allNames: NAMES,
  allIssues: ISSUES,
  allOptions: OPTIONS,
  allDisasters: DISASTERS,
  closedTickets: [],
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
  const allIds = state.openTickets.map((t) => t.id);
  const newId = allIds.length > 0 ? Math.max.apply(null, allIds) + 1 : 1;

  const ticket = { ...action.ticket, id: newId };
  const openTickets = [...state.openTickets, ticket];
  return updateObject(state, { openTickets });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_TICKET:
      return updateObject(state, { selectedTicket: action.ticket });
    case actionTypes.CLOSE_TICKET:
      return closeTicket(state, action);
    case actionTypes.OPEN_TICKET:
      return openTicket(state, action);
    default:
      return state;
  }
};

export default reducer;
