import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import GameAvailableComponent from "./GameAvailableComponent";

const GamesListComponent = (props) => {
  return (
    <div className={"my-4"}>
      <h3 className={"text-2xl"}>Unirse a otra sala</h3>
      {props.loading && (
        <div className={"my-4"}>
          <Icon icon={faCircleNotch} spin /> Cargando salas...
        </div>
      )}
      {!props.loading && props.games.length === 0 && (
        <div className={"my-4"}>No hay salas abiertas</div>
      )}
      {!props.loading &&
        props.games.map(({ gameID, players }) => (
          <GameAvailableComponent
            key={gameID}
            gameID={gameID}
            players={players}
            disabled={props.disabled}
            onJoin={props.onJoin}
          />
        ))}
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
