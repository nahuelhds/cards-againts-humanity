import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Lobby from "./components/Lobby";

import "./App.css";

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/games/:gameID/" component={Lobby} />
          <Route exact path="/" component={Lobby} />
        </Switch>
      </Router>
    );
  }
}
