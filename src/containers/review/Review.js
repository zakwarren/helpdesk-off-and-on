import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "./Review.module.css";
import * as actions from "../../store/actions";
import { STAGES, YEAR_LENGTH } from "../../shared/config";
import { Card } from "../../components";

export const Review = (props) => {
  const {
    username,
    day,
    dayExperience,
    closedTickets,
    failedTickets,
    yearData,
    onNextDay,
  } = props;
  const isYearReview = day % YEAR_LENGTH === 0;

  const yearReview = isYearReview && (
    <>
      <p>Now let's see how your yearly performance stacks up.</p>
      <div className={css.Stats}>
        <Card isEnabled={false} isActive={false} onClick={() => {}}>
          <>
            <h5>Total Experience Gained</h5>
            <p>{yearData.experience}</p>
          </>
        </Card>
        <Card isEnabled={false} isActive={false} onClick={() => {}}>
          <>
            <h5>Successful Tickets</h5>
            <p>{yearData.closedTickets}</p>
          </>
        </Card>
        <Card isEnabled={false} isActive={false} onClick={() => {}}>
          <>
            <h5>Failed Tickets</h5>
            <p>{yearData.failedTickets}</p>
          </>
        </Card>
      </div>
    </>
  );

  return (
    <section className={css.Review}>
      <h1>{isYearReview ? "Yearly" : "Daily"} Review</h1>
      <p className={css.Speaker}>Lukasz:</p>
      <p>So {username}, let's take a look at how you did today.</p>
      <div className={css.Stats}>
        <Card isEnabled={false} isActive={false} onClick={() => {}}>
          <>
            <h5>Total Experience Gained</h5>
            <p>{dayExperience}</p>
          </>
        </Card>
        <Card isEnabled={false} isActive={false} onClick={() => {}}>
          <>
            <h5>Successful Tickets</h5>
            <p>{closedTickets}</p>
          </>
        </Card>
        <Card isEnabled={false} isActive={false} onClick={() => {}}>
          <>
            <h5>Failed Tickets</h5>
            <p>{failedTickets}</p>
          </>
        </Card>
      </div>
      {yearReview}
      <p>
        Your performance could do with some work. Get some rest and be ready for
        more tickets.
      </p>
      <button onClick={onNextDay}>Next Day</button>
    </section>
  );
};

Review.propTypes = {
  username: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  dayExperience: PropTypes.number.isRequired,
  closedTickets: PropTypes.number.isRequired,
  failedTickets: PropTypes.number.isRequired,
  yearData: PropTypes.exact({
    experience: PropTypes.number.isRequired,
    closedTickets: PropTypes.number.isRequired,
    failedTickets: PropTypes.number.isRequired,
    openTickets: PropTypes.number.isRequired,
  }).isRequired,
  onNextDay: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    username: state.player.username,
    day: state.game.day,
    dayExperience: state.player.dayExperience,
    closedTickets: state.game.closedTickets.length,
    failedTickets: state.game.failedTickets.length,
    yearData: state.game.yearData,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onNextDay: () => {
      dispatch(actions.clearDayExperience());
      dispatch(actions.resetTickets());
      dispatch(actions.nextDay());
      dispatch(actions.setStage(STAGES.helpdesk));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
