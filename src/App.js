import React from "react";

import css from "./App.module.css";
import Menu from "./containers/menu/Menu";

const App = () => {
  return (
    <>
      <Menu username="Test" />
      <main className={css.Main}></main>
    </>
  );
};

export default App;
