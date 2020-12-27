import * as actionTypes from "./actionTypes";
import { getRandomArrayItem, weightedRandom } from "../../shared/utilities";

export const setStage = (stage) => {
  return {
    type: actionTypes.SET_STAGE,
    stage,
  };
};

export const setSelectedTicket = (ticket) => {
  return {
    type: actionTypes.SET_SELECTED_TICKET,
    ticket,
  };
};

export const openTicket = (
  customer,
  issueType,
  issue,
  experience,
  patience
) => {
  return {
    type: actionTypes.OPEN_TICKET,
    ticket: { customer, issueType, issue, experience, patience },
  };
};

export const openRandomTicket = () => {
  return (dispatch, getState) => {
    const { allNames, allIssues } = getState().game;
    const { skills } = getState().player;
    const availableSkills = Object.keys(skills);

    const customer = getRandomArrayItem(allNames);
    const types = Object.keys(allIssues);
    const availableTypes = types.filter((t) => availableSkills.includes(t));
    const issueType = getRandomArrayItem(availableTypes);
    const issue = getRandomArrayItem(allIssues[issueType]);
    const experience = weightedRandom(10 * 2, 2);
    const patience = weightedRandom(99, 4);

    dispatch(openTicket(customer, issueType, issue, experience, patience));
  };
};

export const closeTicket = (ticket) => {
  return {
    type: actionTypes.CLOSE_TICKET,
    ticket,
  };
};

export const failTicket = (ticket, charisma) => {
  return {
    type: actionTypes.FAIL_TICKET,
    ticket,
    charisma,
  };
};

export const resetTickets = () => {
  return {
    type: actionTypes.RESET_TICKETS,
  };
};
