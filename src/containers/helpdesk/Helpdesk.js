import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import css from "./Helpdesk.module.css";
import { Card } from "../../components";

export const Helpdesk = (props) => {
  const { customer, issueType, issue, onGetCustomer } = props;

  if (!customer || !issueType || !issue) {
    onGetCustomer();
  }

  return (
    <Card>
      <div className={css.Issue}>
        <span className={css.Type}>{issueType}</span>
        <h4>{customer}</h4>
        <p>"{issue}"</p>
      </div>
    </Card>
  );
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
