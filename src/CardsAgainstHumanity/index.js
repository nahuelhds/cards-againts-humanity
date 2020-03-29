import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { CardsAgainstHumanity } from "./game";
import board from "./components/Board";

import PlayerSelection from "./components/PlayerSelection";

const CardsAgainstHumanityClient = Client({
  board,
  debug: false,
  game: CardsAgainstHumanity,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  numPlayers: 3,
});

const CardsAgainstHumanityLoader = () => {
  const { playerId } = useParams();
  return <CardsAgainstHumanityClient playerId={playerId} />;
};

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PlayerSelection} />
          <Route
            path="/room/:roomId/player/:playerId"
            component={CardsAgainstHumanityLoader}
          />
        </Switch>
      </Router>
    );
  }
}
