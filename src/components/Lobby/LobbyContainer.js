import React, {Component, Fragment} from "react";
import {createGame, joinGame, listGames} from "../../services/lobby";
import GameCreateComponent from "./GameCreateComponent";
import GamesListComponent from "./GamesListComponent";

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
            <Fragment>
              <GameCreateComponent
                disabled={playerName.length === 0}
                onCreate={this.handleGameCreation}
              />
              <GamesListComponent games={games} loading={loading} />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

