import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

import { NAMES, ISSUES, OPTIONS, DISASTERS } from "../data";
import { STAGES } from "../../shared/config";

const initialState = {
  stage: STAGES.setup,
  day: 1,
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
  yearData: {
    experience: 0,
    closedTickets: 0,
    failedTickets: 0,
    openTickets: 0,
  },
};

const closeTicket = (state, action) => {
  const ticket = action.ticket;
  const openTickets = state.openTickets.filter((t) => t.id !== ticket.id);
  const closedTickets = [...state.closedTickets, ticket];

  const selectedTicket =
    state.selectedTicket.id === ticket.id ? null : state.selectedTicket;
  const message = `Success! You gained ${ticket.experience} experience points!`;

  const yearData = updateObject(state.yearData, {
    experience: state.yearData.experience + ticket.experience,
    closedTickets: state.yearData.closedTickets + 1,
  });
  return updateObject(state, {
    openTickets,
    closedTickets,
    selectedTicket,
    message,
    yearData,
  });
};

const openTicket = (state, action) => {
  const maxId = state.maxId + 1;
  const ticket = { ...action.ticket, id: maxId };
  const openTickets = [...state.openTickets, ticket];

  const yearData = updateObject(state.yearData, {
    openTickets: state.yearData.openTickets + 1,
  });
  return updateObject(state, { openTickets, maxId, yearData });
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
    const halfExp = Math.floor(ticket.experience / 2);
    const message = `Failed to solve ${ticket.issueType} issue. You gained ${halfExp} experience points! ${ticket.customer} lost patience.`;
    const yearData = updateObject(state.yearData, {
      experience: state.yearData.experience + halfExp,
    });
    return updateObject(state, {
      openTickets,
      selectedTicket: null,
      message,
      yearData,
    });
  } else {
    const openTickets = state.openTickets.filter((t) => t.id !== ticket.id);
    const failedTickets = [...state.closedTickets, ticket];
    const message = `Failed to solve ${ticket.customer}'s issue. They ran out of patience and left.`;

    const yearData = updateObject(state.yearData, {
      failedTickets: state.yearData.failedTickets + 1,
    });
    return updateObject(state, {
      openTickets,
      failedTickets,
      selectedTicket: null,
      message,
      yearData,
    });
  }
};

const failAllOpen = (state) => {
  const failedTickets = [...state.failedTickets, ...state.openTickets];
  const yearData = updateObject(state.yearData, {
    failedTickets: state.yearData.failedTickets + state.openTickets.length,
  });
  return updateObject(state, { failedTickets, openTickets: [], yearData });
};

const reset = (state) => {
  return updateObject(state, {
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
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STAGE:
      return updateObject(state, { stage: action.stage });
    case actionTypes.NEXT_DAY:
      return updateObject(state, { day: state.day + 1 });
    case actionTypes.SET_SELECTED_TICKET:
      return updateObject(state, { selectedTicket: action.ticket });
    case actionTypes.CLOSE_TICKET:
      return closeTicket(state, action);
    case actionTypes.OPEN_TICKET:
      return openTicket(state, action);
    case actionTypes.FAIL_TICKET:
      return failTicket(state, action);
    case actionTypes.FAIL_ALL_OPEN:
      return failAllOpen(state);
    case actionTypes.RESET_TICKETS:
      return reset(state);
    default:
      return state;
  }
};

export default reducer;
