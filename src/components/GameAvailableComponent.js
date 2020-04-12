import React from "react";
import { getItem } from "../services/storage";

const GameAvailableComponent = (props) => {
  const currentPlayers = props.players.filter((player) => !!player.name);
  const isFull = props.players.length === currentPlayers.length;
  const owner = props.players[0];
  const joinedGames = getItem("joinedGames", []);
  const joinedGame = joinedGames.find((game) => game.gameID === props.gameID);
  let buttonText;
  if (!!joinedGame) {
    buttonText = "Volver a la sala";
  } else {
    buttonText = isFull ? "Sala llena" : "Unirme";
  }
  return (
    <div className={"my-4 p-4 bg-white"}>
      <h4 className={"text-lg"}>
        Sala de <strong>{owner.name}</strong> ({currentPlayers.length} de{" "}
        {props.players.length})
      </h4>
      <div className={" my-4"}>
        <p>Participantes</p>
        <ul className={"list-disc list-inside"}>
          {currentPlayers.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
      <button
        className={"button success w-full"}
        disabled={!joinedGame && (isFull || props.disabled)}
        onClick={() => props.onJoin(props.gameID, currentPlayers.length)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GameAvailableComponent;
