import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { STAGES } from "../../shared/config";
import Helpdesk from "../helpdesk/Helpdesk";

export const Game = (props) => {
  const { stage } = props;

  switch (stage) {
    case STAGES.setup:
      return null;
    case STAGES.tutorial:
      return null;
    case STAGES.helpdesk:
      return <Helpdesk />;
    case STAGES.review:
      return null;
    case STAGES.yearReview:
      return null;
    default:
      return null;
  }
};

Game.propTypes = {
  stage: PropTypes.string.isRequired,
};

export const mapStateToProps = (state) => {
  return {
    stage: state.game.stage,
  };
};

export default connect(mapStateToProps)(Game);
