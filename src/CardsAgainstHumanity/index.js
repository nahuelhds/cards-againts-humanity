import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Lobby as ExampleLobby } from "boardgame.io/react";

import { GameCardsAgainstHumanity } from "./game";
import { serverUri } from "./services/lobby";
import Lobby from "./components/Lobby";
import BoardCardsAgainstHumanity from "./components/Board";

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
          <Route exact path="/test" component={LobbyView} />
          <Route exact path="/" component={Lobby} />
        </Switch>
      </Router>
    );
  }
}
