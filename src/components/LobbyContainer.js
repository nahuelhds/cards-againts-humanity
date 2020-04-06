import React, { Component, Fragment } from "react";
import { createGame, joinGame, listGames } from "../services/lobby";
import GameCreateComponent from "./GameCreateComponent";
import GamesListComponent from "./GamesListComponent";
import { getItem, setItem } from "../services/storage";

export default class LobbyContainer extends Component {
  state = {
    playerName: getItem("playerName", ""),
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

  handlePlayerName = (event) => {
    const playerName = event.target.value;
    this.setState({ playerName });
    setItem("playerName", playerName);
  };

  // TODO: this should be inside GameCreateComponent
  handleGameCreation = async (size) => {
    try {
      const { gameID } = await createGame(size);
      this.handleJoinGame(gameID, 0);
    } catch (e) {
      console.warn(e);
    }
  };

  handleJoinGame = async (gameID, assignedPlayerID) => {
    try {
      const { playerCredentials } = await joinGame(
        gameID,
        assignedPlayerID,
        this.state.playerName
      );
      setItem("gameID", gameID);
      setItem("playerCredentials", playerCredentials);
      this.setState({ gameID, playerCredentials });
      this.props.history.push(`/games/${gameID}`);
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    const { playerName, gameID, games, loading } = this.state;
    return (
      <div className={"flex p-4 items-center"}>
        <div className="flex-1 m-1 flex flex-col left">
          <label className={"text-2xl"}>Nombre</label>
          <input
            className={"flex-1 py-2 px-4 rounded"}
            type={"text"}
            value={playerName}
            onChange={this.handlePlayerName}
          />
          {!gameID && (
            <Fragment>
              <GameCreateComponent
                disabled={playerName.length === 0}
                onCreate={this.handleGameCreation}
              />
              <GamesListComponent
                games={games}
                loading={loading}
                disabled={playerName.length === 0}
                onJoin={this.handleJoinGame}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
