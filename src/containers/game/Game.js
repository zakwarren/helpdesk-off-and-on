import React from "react";
import { useSelector } from "react-redux";

import { STAGES } from "../../shared/config";
import Setup from "../setup/Setup";
import Tutorial from "../tutorial/Tutorial";
import Helpdesk from "../helpdesk/Helpdesk";
import Review from "../review/Review";

const Game = () => {
  const stage = useSelector((state) => state.game.stage);

  switch (stage) {
    case STAGES.setup:
      return <Setup />;
    case STAGES.tutorial:
      return <Tutorial />;
    case STAGES.helpdesk:
      return <Helpdesk />;
    case STAGES.review:
      return <Review />;
    default:
      return null;
  }
};

export default Game;
