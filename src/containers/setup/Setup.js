import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import css from "./Setup.module.css";
import * as actions from "../../store/actions";
import { STAGES } from "../../shared/config";
import Contract from "./contract/Contract";

export const Setup = (props) => {
  const { username, manager, onSetStage } = props;
  const [step, setStep] = useState(0);

  let content = null;
  switch (step) {
    case 0:
      content = (
        <>
          <p className={css.Speaker}>HR:</p>
          <p>Welcome to your new job at Incompecorp!</p>
          <p>Before we start, there's just the matter of the paperwork.</p>
          <Contract css={css} onSuccess={() => setStep(1)} />
        </>
      );
      break;
    case 1:
      content = (
        <>
          <p className={css.Speaker}>{manager}:</p>
          <p>
            Good to meet you {username}. I'm {manager} and I'll be your manager
            here. I'm sure you'll do great.
          </p>
          <p>
            Would you like a full induction or would you prefer to get started
            straight away?
          </p>
          <button onClick={() => onSetStage(STAGES.tutorial)}>Induction</button>
          <button onClick={() => setStep(2)}>Quick Start</button>
        </>
      );
      break;
    case 2:
      content = (
        <>
          <p className={css.Speaker}>{manager}:</p>
          <p>Well no time to waste. The helpdesk awaits you!</p>
          <button onClick={() => onSetStage(STAGES.helpdesk)}>Let's Go!</button>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <section className={css.Setup}>
      <h1>Helpdesk Simulator</h1>
      {content}
    </section>
  );
};

Setup.propTypes = {
  username: PropTypes.string,
  manager: PropTypes.string,
  onSetStage: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    username: state.player.username,
    manager: state.player.manager,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onSetStage: (stage) => dispatch(actions.setStage(stage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
