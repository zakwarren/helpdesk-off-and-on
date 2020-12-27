import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Review.module.css";
import * as actions from "../../store/actions";

export const Review = (props) => {
  const { username, dayExperience, closedTickets, failedTickets } = props;

  return (
    <section className={css.Review}>
      <h1>Daily Review</h1>
      <p className={css.Speaker}>Lukasz:</p>
      <p>So {username}, let's take a look at how you did today.</p>
    </section>
  );
};

Review.propTypes = {
  username: PropTypes.string.isRequired,
  dayExperience: PropTypes.number.isRequired,
  closedTickets: PropTypes.number.isRequired,
  failedTickets: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    username: state.player.username,
    dayExperience: state.player.dayExperience,
    closedTickets: state.game.closedTickets.length,
    failedTickets:
      state.game.failedTickets.length + state.game.openTickets.length,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => {
      dispatch(actions.clearDayExperience());
      dispatch(actions.resetTickets());
    },
  };
};

export default connect(mapStateToProps)(Review);
