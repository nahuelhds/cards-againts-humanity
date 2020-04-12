import { Link } from "react-router-dom";
import React from "react";

const GameAvailableComponent = (props) => {
  const currentPlayers = props.players.filter((player) => !!player.name);
  const isFull = props.players.length === currentPlayers.length;
  const owner = props.players[0];
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
        disabled={isFull || props.disabled}
        onClick={() => props.onJoin(props.gameID, currentPlayers.length)}
      >
        {isFull && "Sala llena"}
        {!isFull && "Unirme"}
      </button>
    </div>
  );
};

export default GameAvailableComponent;
