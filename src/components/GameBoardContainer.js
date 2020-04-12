import React from "react";

import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { GameCardsAgainstHumanity } from "./CardsAgainstHumanity/game";
import BoardContainer from "./CardsAgainstHumanity/Board";

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
      playerID={props.playerID.toString()}
      credentials={props.credentials}
    />
  );
};

const GameBoardContainer = ({
  gameID,
  playerID,
  playerCredentials,
  numPlayers,
}) => {
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
