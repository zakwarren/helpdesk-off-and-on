import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
// import css from "./Helpdesk.module.css";
import { Issue } from "../../components";

export const Helpdesk = (props) => {
  const { customer, issueType, issue, onGetCustomer } = props;

  if (!customer || !issueType || !issue) {
    onGetCustomer();
    return null;
  }

  return <Issue {...{ customer, issueType, issue }} />;
};

Helpdesk.propTypes = {
  customer: PropTypes.string,
  issueType: PropTypes.string,
  issue: PropTypes.string,
  onGetCustomer: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    customer: state.game.customer,
    issueType: state.game.issueType,
    issue: state.game.issue,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onGetCustomer: () => dispatch(actions.getRandomCustomer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
