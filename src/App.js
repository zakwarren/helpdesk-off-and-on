import React from "react";

import css from "./App.module.css";
import { Menu, Game } from "./containers";
import { useLoadGame } from "./hooks";

const App = () => {
  useLoadGame();

  return (
    <>
      <Menu />
      <main className={css.Main}>
        <Game />
      </main>
    </>
  );
};

export default App;
