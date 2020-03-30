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
  debug: true,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  numPlayers: 3,
  board,
  game: CardsAgainstHumanity,
});

const CardsAgainstHumanityLoader = () => {
  const { playerID } = useParams();
  return <CardsAgainstHumanityClient playerID={playerID} />;
};

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PlayerSelection} />
          <Route
            path="/room/:roomId/player/:playerID"
            component={CardsAgainstHumanityLoader}
          />
        </Switch>
      </Router>
    );
  }
}
