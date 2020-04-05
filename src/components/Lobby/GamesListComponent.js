import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const GamesListComponent = (props) => {
  return (
    <div className={"my-4"}>
      <h3 className={"text-2xl"}>Unirse a otra sala</h3>
      {props.loading && (
        <p>
          <Icon icon={faCircleNotch} spin /> Cargando salas...
        </p>
      )}
      {!props.loading &&
        props.games.map(({ gameID, players }) => {
          const currentPlayers = players.filter((player) => !!player.name);
          return (
            <div key={gameID} className={"my-4 p-4 bg-white"}>
              <h4 className={"text-lg"}>
                Sala de <strong>{players[0].name}</strong> (
                {currentPlayers.length} de {players.length})
              </h4>
              <div className={" my-4"}>
                <p>Participantes</p>
                <ul className={"list-disc list-inside"}>
                  {currentPlayers.map((player) => (
                    <li key={player.name}>{player.name}</li>
                  ))}
                </ul>
              </div>
              <Link to={`/games/${gameID}`}>
                <button className={"button success w-full"}>Unirse</button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

GamesListComponent.propTypes = {
  games: PropTypes.array,
  loading: PropTypes.bool,
};

GamesListComponent.defaultProps = {
  games: [],
  loading: false,
};

export default GamesListComponent;
