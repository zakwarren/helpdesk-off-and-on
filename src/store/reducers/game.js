import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

import { NAMES, ISSUES, OPTIONS, DISASTERS } from "../data";

const initialState = {
  allNames: NAMES,
  allIssues: ISSUES,
  allOptions: OPTIONS,
  allDisasters: DISASTERS,
  customer: null,
  issueType: null,
  issue: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUSTOMER:
      return updateObject(state, {
        customer: action.customer,
        issueType: action.issueType,
        issue: action.issue,
      });
    default:
      return state;
  }
};

export default reducer;
