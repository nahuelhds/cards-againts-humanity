import {Link} from "react-router-dom";
import React from "react";

const GameAvailableComponent = props => {
  const currentPlayers = props.players.filter((player) => !!player.name);
  const owner = props.players[0];
  return (
    <div className={"my-4 p-4 bg-white"}>
      <h4 className={"text-lg"}>
        Sala de <strong>{owner.name}</strong> (
        {currentPlayers.length} de {props.players.length})
      </h4>
      <div className={" my-4"}>
        <p>Participantes</p>
        <ul className={"list-disc list-inside"}>
          {currentPlayers.map((player) => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ul>
      </div>
      <Link to={`/games/${props.gameID}`}>
        <button className={"button success w-full"}>Unirse</button>
      </Link>
    </div>
  );
}

export default GameAvailableComponent;