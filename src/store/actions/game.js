import * as actionTypes from "./actionTypes";
import { getRandomArrayItem } from "../../shared/utilities";

export const setSelectedTicket = (ticket) => {
  return {
    type: actionTypes.SET_SELECTED_TICKET,
    ticket,
  };
};

export const openTicket = (customer, issueType, issue) => {
  return {
    type: actionTypes.OPEN_TICKET,
    ticket: { customer, issueType, issue },
  };
};

export const openRandomTicket = () => {
  return (dispatch, getState) => {
    const { allNames, allIssues } = getState().game;

    const customer = getRandomArrayItem(allNames);
    const types = Object.keys(allIssues);
    const issueType = getRandomArrayItem(types);
    const issue = getRandomArrayItem(allIssues[issueType]);

    dispatch(openTicket(customer, issueType, issue));
  };
};

export const closeTicket = (ticket) => {
  return {
    type: actionTypes.CLOSE_TICKET,
    ticket,
  };
};
