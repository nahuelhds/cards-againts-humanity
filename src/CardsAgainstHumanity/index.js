import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { CardsAgainstHumanity } from "./game";
import board from "./components/Board";

import PlayerSelection from "./components/PlayerSelection";

const CardsAgainstHumanityLoader = () => {
  const { playerID, gameID = "default", size = "4" } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const debug = params.get("debug") === "true";
  const numPlayers = parseInt(size);

  const CardsAgainstHumanityClient = Client({
    debug,
    enhancer:
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    multiplayer: SocketIO({ server: "localhost:8000" }),
    numPlayers,
    board,
    game: CardsAgainstHumanity,
  });

  return <CardsAgainstHumanityClient gameID={gameID} playerID={playerID} />;
};

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PlayerSelection} />
          <Route
            path="/game/:gameID/size/:size/player/:playerID"
            component={CardsAgainstHumanityLoader}
          />
        </Switch>
      </Router>
    );
  }
}
