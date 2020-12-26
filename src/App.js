import React from "react";

import css from "./App.module.css";
import { Menu, Game } from "./containers";

const App = () => {
  return (
    <>
      <Menu username="Test" />
      <main className={css.Main}>
        <Game />
      </main>
    </>
  );
};

export default App;
