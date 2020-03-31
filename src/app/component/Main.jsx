import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from './Navigation';

const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <ConnectedNavigation />
        <Route exact path="/dashboard" render={() => <ConnectedDashboard />} />
      </Provider>
    </Router>
  );
};

export default Main;
