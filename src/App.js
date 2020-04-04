import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Lobby as ExampleLobby } from "boardgame.io/react";
import { serverUri } from "./services/lobby";

import Lobby from "./components/Lobby";
import { GameCardsAgainstHumanity } from "./components/CardsAgainstHumanity/game";
import BoardCardsAgainstHumanity from "./components/CardsAgainstHumanity/Board";

import './App.css';

GameCardsAgainstHumanity.minPlayers = 3;
GameCardsAgainstHumanity.maxPlayers = 15;

const LobbyView = () => (
  <ExampleLobby
    debug={true}
    gameServer={serverUri}
    lobbyServer={serverUri}
    gameComponents={[
      {
        game: GameCardsAgainstHumanity,
        board: BoardCardsAgainstHumanity,
      },
    ]}
  />
);

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route exact path="/game/:gameID/" component={Lobby} />
        </Switch>
      </Router>
    );
  }
}
