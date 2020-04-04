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

import MainMenu from "./components/MainMenu";
import PlayerSelection from "./components/PlayerSelection";

const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

const CardsAgainstHumanityLoader = () => {
  const { playerID, gameID = "default", size = "4" } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const debug = params.get("debug") === "true";
  const numPlayers = parseInt(size);
  const CardsAgainstHumanityClient = Client({
    board,
    game: CardsAgainstHumanity,
    numPlayers,
    debug,
    enhancer: reduxDevToolsExtension && reduxDevToolsExtension(),
    multiplayer: SocketIO({
      server: process.env.REACT_APP_MULTIPLAYER_SERVER || "localhost:8000",
    }),
  });

  return <CardsAgainstHumanityClient gameID={gameID} playerID={playerID} />;
};

export default class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainMenu} />
          {/*<Route exact path="/" component={PlayerSelection} />*/}
          <Route
            path="/game/:gameID/size/:size/player/:playerID"
            component={CardsAgainstHumanityLoader}
          />
        </Switch>
      </Router>
    );
  }
}
