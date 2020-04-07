import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import LobbyContainer from "./components/LobbyContainer";
import InvitationContainer from "./components/InvitationContainer";
import GameAuthContainer from "./components/GameAuthContainer";
import GameBoardContainer from "./components/GameBoardContainer";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/games/:gameID/player/:playerID/board"
            component={GameBoardContainer}
          />
          <Route
            exact
            path="/games/:gameID/player/:playerID"
            component={GameAuthContainer}
          />
          <Route exact path="/games/:gameID" component={InvitationContainer} />
          <Route exact path="/" component={LobbyContainer} />
        </Switch>
      </Router>
    );
  }
}
