import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LobbyContainer from "./components/LobbyContainer";
import RoomContainer from "./components/RoomContainer";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/games/:gameID/" component={RoomContainer} />
          <Route exact path="/" component={LobbyContainer} />
        </Switch>
      </Router>
    );
  }
}
