import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import css from "./Setup.module.css";
import * as actions from "../../store/actions";
import { STAGES } from "../../shared/config";
import Contract from "./contract/Contract";

export const Setup = (props) => {
  const { username, onSetStage } = props;
  const [step, setStep] = useState(0);

  let content = null;
  switch (step) {
    case 0:
      content = (
        <>
          <p>
            Welcome to your new job at Incompecorp! I'm Lukasz and I'll be your
            manager here.
          </p>
          <p>Before we start, there's just the matter of the paperwork.</p>
          <Contract css={css} onSuccess={() => setStep(1)} />
        </>
      );
      break;
    case 1:
      content = (
        <>
          <p>Good to meet you {username}. I'm sure you'll do great.</p>
          <p>
            Would you like a full induction or would you prefer to get started
            straight away?
          </p>
          <button
            className={css.Button}
            onClick={() => onSetStage(STAGES.tutorial)}
          >
            Induction
          </button>
          <button className={css.Button} onClick={() => setStep(2)}>
            Quick Start
          </button>
        </>
      );
      break;
    case 2:
      content = (
        <>
          <p>Well no time to waste. The helpdesk awaits you!</p>
          <button
            className={css.Button}
            onClick={() => onSetStage(STAGES.helpdesk)}
          >
            Let's Go!
          </button>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <section className={css.Setup}>
      <h1>Helpdesk Simulator</h1>
      <p className={css.Speaker}>Lukasz:</p>
      {content}
    </section>
  );
};

Setup.propTypes = {
  username: PropTypes.string,
  onSetStage: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    username: state.player.username,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onSetStage: (stage) => dispatch(actions.setStage(stage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
