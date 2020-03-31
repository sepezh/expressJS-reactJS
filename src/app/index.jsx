import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./component/Main";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
