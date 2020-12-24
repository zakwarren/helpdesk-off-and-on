import * as actionTypes from "./actionTypes";
import { getRandomArrayItem } from "../../shared/utilities";

export const setCustomer = (customer, issueType, issue) => {
  return {
    type: actionTypes.SET_CUSTOMER,
    customer,
    issueType,
    issue,
  };
};

export const getRandomCustomer = () => {
  return (dispatch, getState) => {
    const { allNames, allIssues } = getState().game;

    const customer = getRandomArrayItem(allNames);
    const types = Object.keys(allIssues);
    const issueType = getRandomArrayItem(types);
    const issue = getRandomArrayItem(types[issueType]);

    dispatch(setCustomer(customer, issueType, issue));
  };
};
