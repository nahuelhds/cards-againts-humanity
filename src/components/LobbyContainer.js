import React, { Component } from "react";
import { createGame, joinGame, listGames } from "../services/lobby";
import GameCreateComponent from "./GameCreateComponent";
import GamesListComponent from "./GamesListComponent";
import { getItem, setItem } from "../services/storage";
import { CONFLICT } from "http-status-codes";

export default class LobbyContainer extends Component {
  state = {
    playerName: getItem("playerName", ""),
    joinedGames: getItem("joinedGames", []),
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

  handleJoinGame = async (gameID, playerID, playersCount) => {
    // TODO refactor this
    const { playerName, joinedGames } = this.state;
    try {
      let joinedGame = joinedGames.find((game) => game.gameID === gameID);
      if (!joinedGame) {
        const { playerCredentials } = await joinGame(
          gameID,
          playerID,
          playerName
        );
        joinedGame = { gameID, playerID, playerName, playerCredentials };
        setItem("joinedGames", [...joinedGames, joinedGame]);
      }

      this.props.history.push(`/games/${gameID}/player/${joinedGame.playerID}`);
    } catch (e) {
      // If join action fails and there is an empty seat yet
      if (e.status === CONFLICT && playerID < playersCount) {
        return this.handleJoinGame(gameID, playerID + 1);
      }
      this.refreshGamesAsync();
      console.warn(`Could not join to game ${gameID}`, e);
    }
  };

  render() {
    const { playerName, games, loading } = this.state;
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
        </div>
      </div>
    );
  }
}
