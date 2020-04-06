import React from "react";
import { Redirect } from "react-router-dom";

import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { GameCardsAgainstHumanity } from "./CardsAgainstHumanity/game";
import BoardContainer from "./CardsAgainstHumanity/Board";

import { getItem } from "../services/storage";

const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const CardsAgainstHumanityClient = (props) => {
  const params = new URLSearchParams(window.location.search);
  const debug = params.get("debug") === "true";

  const GameClient = Client({
    board: BoardContainer,
    enhacer: reduxDevToolsExtension && reduxDevToolsExtension(),
    debug,
    game: GameCardsAgainstHumanity,
    multiplayer: SocketIO({
      server: process.env.REACT_APP_MULTIPLAYER_SERVER || "localhost:8000",
    }),
    numPlayers: props.numPlayers,
  });

  return (
    <GameClient
      gameID={props.gameID}
      playerID={props.playerID}
      credentials={props.credentials}
    />
  );
};

const GameBoardContainer = (props) => {
  const { gameID, playerID: urlPlayerID } = props.match.params;
  const playerID = getItem("playerID", "").toString();
  const numPlayers = getItem("numPlayers", 0);
  const playerCredentials = getItem("playerCredentials", "").toString();

  // If the player is there but the URL is wrong...
  if (playerID !== urlPlayerID) {
    return <Redirect to={`/games/${gameID}/player/${playerID}`} />;
  }

  // Racock: 0, fTFme7Opr
  // nahue: 1, LPOBH5QXw

  return (
    <CardsAgainstHumanityClient
      credentials={playerCredentials}
      gameID={gameID}
      playerID={playerID}
      numPlayers={numPlayers}
    />
  );
};

export default GameBoardContainer;
