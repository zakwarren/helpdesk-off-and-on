import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import css from "./Start.module.css";
import { resetPlayer, resetGame } from "../../store/actions";
import { useLoadGame } from "../../hooks";

const Start = (props) => {
  const { onStart } = props;
  const dispatch = useDispatch();
  const hasSaveData = useLoadGame();

  const newGame = () => {
    dispatch(resetPlayer());
    dispatch(resetGame());
    onStart();
  };

  return (
    <section className={css.Start}>
      <h1>Helpdesk Simulator 2: Turn It Off and On Again</h1>
      <div className={css.Controls}>
        <button onClick={newGame}>New Game</button>
        {hasSaveData && <button onClick={() => onStart()}>Load Game</button>}
        <button onClick={() => window.close()}>Quit</button>
      </div>
    </section>
  );
};

Start.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default Start;
