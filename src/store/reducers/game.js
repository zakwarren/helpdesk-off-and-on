import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

import { NAMES, ISSUES, OPTIONS, DISASTERS } from "../data";
import { STAGES } from "../../shared/config";

const initialState = {
  stage: STAGES.setup,
  allNames: NAMES,
  allIssues: ISSUES,
  allOptions: OPTIONS,
  allDisasters: DISASTERS,
  maxId: 0,
  closedTickets: [],
  failedTickets: [],
  openTickets: [],
  selectedTicket: null,
  message: null,
};

const closeTicket = (state, action) => {
  const ticket = action.ticket;
  const openTickets = state.openTickets.filter((t) => t.id !== ticket.id);
  const closedTickets = [...state.closedTickets, ticket];

  const selectedTicket =
    state.selectedTicket.id === ticket.id ? null : state.selectedTicket;
  const message = `Success! You gained ${ticket.experience} experience points!`;

  return updateObject(state, {
    openTickets,
    closedTickets,
    selectedTicket,
    message,
  });
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
    const message = `Failed to solve ${ticket.issueType} issue. ${ticket.customer} lost patience.`;
    return updateObject(state, { openTickets, selectedTicket: null, message });
  } else {
    const openTickets = state.openTickets.filter((t) => t.id !== ticket.id);
    const failedTickets = [...state.closedTickets, ticket];
    const message = `Failed to solve ${ticket.customer}'s issue. They ran out of patience and left.`;
    return updateObject(state, {
      openTickets,
      failedTickets,
      selectedTicket: null,
      message,
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STAGE:
      return updateObject(state, { stage: action.stage });
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
