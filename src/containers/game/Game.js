import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { STAGES } from "../../shared/config";
import Setup from "../setup/Setup";
import Helpdesk from "../helpdesk/Helpdesk";
import Review from "../review/Review";

export const Game = (props) => {
  const { stage } = props;

  switch (stage) {
    case STAGES.setup:
      return <Setup />;
    case STAGES.tutorial:
      return <h2>Tutorial...</h2>;
    case STAGES.helpdesk:
      return <Helpdesk />;
    case STAGES.review:
      return <Review />;
    case STAGES.yearReview:
      return <h2>Yearly Review...</h2>;
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
