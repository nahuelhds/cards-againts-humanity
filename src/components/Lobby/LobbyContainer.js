import React, { Component } from "react";
import PropTypes from "prop-types";
import { GameCreation } from "./GameCreation";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { createGame, joinGame, listGames } from "../../services/lobby";

export default class LobbyContainer extends Component {
  state = {
    playerName: "",
    playerCredentials: {},
    gameID: "",
    loading: true,
    games: [],
  };

  componentDidMount() {
    this.refreshGamesAsync();
  }

  refreshGamesAsync() {
    this.setState({ loading: true });
    listGames()
      .then(({ rooms }) => this.setState({ games: rooms }))
      .finally(() => this.setState({ loading: false }));
  }

  handlePlayerName = (event) =>
    this.setState({ playerName: event.target.value });

  handleGameCreation = async () => {
    try {
      const { gameID } = await createGame(this.state.size);
      const { playerCredentials } = await joinGame(
        gameID,
        0,
        this.state.playerName
      );
      this.setState({ gameID, playerCredentials });
      this.refreshGamesAsync();
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    const { playerName, gameID, games, loading } = this.state;
    return (
      <div className={"flex p-4 items-center"}>
        <div className="flex-1 m-1 flex flex-col left">
          <label className={"text-2xl"}>Nombre o apodo</label>
          <input
            className={"flex-1 py-2 px-4 rounded"}
            type={"text"}
            value={playerName}
            onChange={this.handlePlayerName}
          />
          {!gameID && (
            <GameCreation
              disabled={playerName.length === 0}
              onCreate={this.handleGameCreation}
            />
          )}
          <AvailableGames myGameID={gameID} games={games} loading={loading} />
        </div>
      </div>
    );
  }
}

class AvailableGames extends Component {
  static propsTypes = {
    games: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    myGameID: PropTypes.string,
  };

  static defaultProps = {
    loading: false,
  };

  render() {
    return (
      <div className={"my-4"}>
        <h2 className={"text-2xl"}>Unirse a otra sala</h2>
        {this.props.loading && (
          <p>
            <Icon icon={faCircleNotch} spin /> Cargando salas...
          </p>
        )}
        {!this.props.loading && (
          <ul>
            {this.props.games.map(({ gameID }) => (
              <li>{gameID}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
