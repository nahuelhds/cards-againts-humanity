import React from "react";
import { Redirect } from "react-router-dom";

import logger from "redux-logger";
import { applyMiddleware, compose } from "redux";

import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { GameCardsAgainstHumanity } from "./CardsAgainstHumanity/game";
import BoardContainer from "./CardsAgainstHumanity/Board";

import { getItem } from "../services/storage";

const numPlayers = getItem("numPlayers", 0);
const params = new URLSearchParams(window.location.search);
const debug = params.get("debug") === "true";
const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const CardsAgainstHumanityClient = Client({
  board: BoardContainer,
  enhancer: compose(
    applyMiddleware(logger),
    reduxDevToolsExtension && reduxDevToolsExtension()
  ),
  debug,
  game: GameCardsAgainstHumanity,
  multiplayer: SocketIO({
    server: process.env.REACT_APP_MULTIPLAYER_SERVER || "localhost:8000",
  }),
  numPlayers,
});

const GameBoardContainer = (props) => {
  const { gameID, playerID: urlPlayerID } = props.match.params;
  const playerID = getItem("playerID", "").toString();
  const playerCredentials = getItem("playerCredentials", "").toString();

  // If the player is there but the URL is wrong...
  if (playerID !== urlPlayerID) {
    return <Redirect to={`/games/${gameID}/player/${playerID}`} />;
  }

  return (
    <CardsAgainstHumanityClient
      credentials={playerCredentials}
      gameID={gameID}
      playerID={playerID}
    />
  );
};

export default GameBoardContainer;
