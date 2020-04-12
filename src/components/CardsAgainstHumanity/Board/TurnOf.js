import React from "react";
import { StatusDefault } from "./Status";

export const TurnOf = ({ currentPlayer, playerID, players }) => {
  let playersTurn;

  if (currentPlayer === playerID) {
    playersTurn = "¡Es tu turno!";
  } else {
    playersTurn = players.find(
      (player) => player.id === parseInt(currentPlayer)
    ).name;
  }
  return (
    <StatusDefault className={"lg:absolute lg:top-0 lg:left-0 lg:z-20"}>
      {currentPlayer !== playerID && "Es el turno de "}
      <strong>{playersTurn}</strong>
    </StatusDefault>
  );
};
