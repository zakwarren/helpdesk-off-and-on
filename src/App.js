import React from "react";

import css from "./App.module.css";
import { Menu, Helpdesk } from "./containers";

const App = () => {
  return (
    <>
      <Menu username="Test" />
      <main className={css.Main}>
        <Helpdesk />
      </main>
    </>
  );
};

export default App;
