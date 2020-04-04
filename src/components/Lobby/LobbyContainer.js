import React, { Component } from "react";
import PropTypes from "prop-types";
import { GameCreation } from "./GameCreation";
import { listGames } from "../../services/lobby";

export default class LobbyContainer extends Component {
  state = {
    playerName: "",
    gameID: "",
    loading: true,
    games: [],
  };

  componentDidMount() {
    listGames()
      .then(({ rooms }) => this.setState({ games: rooms }))
      .finally(() => this.setState({ loading: false }));
  }

  handlePlayerName = (event) =>
    this.setState({ playerName: event.target.value });

  handleGameCreation = (gameID) => {
    this.setState({ gameID });
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
          {!gameID && <GameCreation onCreate={this.handleGameCreation} />}
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

      </div>
    );
  }
}
