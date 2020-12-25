import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import css from "./Helpdesk.module.css";
import { Issue } from "../../components";

export const Helpdesk = (props) => {
  const { allOptions, customer, issueType, issue, onGetCustomer } = props;

  if (!customer || !issueType || !issue) {
    onGetCustomer();
    return null;
  }

  const shuffledOpts = allOptions[issueType].sort(() => 0.5 - Math.random());
  const options = shuffledOpts.slice(0, 4);

  return (
    <>
      <section className={css.IssueTray}>
        <Issue isActive={true} {...{ customer, issueType, issue }} />
      </section>
      <section className={css.Controls}>
        <h3>Options</h3>
        <div className={css.OptionBtns}>
          {options.map((opt, index) => (
            <button key={index}>{opt}</button>
          ))}
        </div>
      </section>
    </>
  );
};

Helpdesk.propTypes = {
  allOptions: PropTypes.object,
  customer: PropTypes.string,
  issueType: PropTypes.string,
  issue: PropTypes.string,
  onGetCustomer: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    allOptions: state.game.allOptions,
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
