import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import css from "./App.module.css";
import { Menu, Game } from "./containers";

const App = () => {
  const routes = (
    <Switch>
      {/* <Route path="/dashboard" exact component={} />
      <Route path="/settings" exact component={} /> */}
      <Route path="/" exact component={Game} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <>
      <Menu username="Test" />
      <main className={css.Main}>{routes}</main>
    </>
  );
};

export default App;
