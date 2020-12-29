import * as actionTypes from "./actionTypes";
import { getRandomArrayItem, weightedRandom } from "../../shared/utilities";
import { NAMES, ISSUES } from "../data";

export const loadGame = (day, stage, yearData) => {
  return {
    type: actionTypes.LOAD_GAME,
    day,
    stage,
    yearData,
  };
};

export const setStage = (stage) => {
  return {
    type: actionTypes.SET_STAGE,
    stage,
  };
};

export const nextDay = () => {
  return {
    type: actionTypes.NEXT_DAY,
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
    const { skills } = getState().player;
    const availableSkills = Object.keys(skills);

    const customer = getRandomArrayItem(NAMES);
    const types = Object.keys(ISSUES);
    const availableTypes = types.filter((t) => availableSkills.includes(t));
    const issueType = getRandomArrayItem(availableTypes);
    const issue = getRandomArrayItem(ISSUES[issueType]);
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

export const disasterTicket = (ticket) => {
  return {
    type: actionTypes.DISASTER,
    ticket,
  };
};

export const failAllOpenTickets = () => {
  return {
    type: actionTypes.FAIL_ALL_OPEN,
  };
};

export const resetTickets = () => {
  return {
    type: actionTypes.RESET_TICKETS,
  };
};
