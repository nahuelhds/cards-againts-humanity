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

const CardsAgainstHumanityLoader = () => {
  const { playerID, size = 4 } = useParams();
  const CardsAgainstHumanityClient = Client({
    debug: false,
    enhancer:
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    multiplayer: SocketIO({ server: "localhost:8000" }),
    numPlayers: parseInt(size),
    board,
    game: CardsAgainstHumanity,
  });

  return <CardsAgainstHumanityClient playerID={playerID} />;
};

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PlayerSelection} />
          <Route
            path="/size/:size/player/:playerID"
            component={CardsAgainstHumanityLoader}
          />
        </Switch>
      </Router>
    );
  }
}
