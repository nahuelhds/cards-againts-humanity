import React, { Component } from "react";
import { getGame, joinGame } from "../services/lobby";
import { getItem, setItem } from "../services/storage";
import GameAvailableComponent from "./GameAvailableComponent";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { NOT_FOUND } from "http-status-codes";
import { Link } from "react-router-dom";

export default class InvitationContainer extends Component {
  state = {
    loading: true,
    hasError: false,
    error: null,
    playerName: getItem("playerName", ""),
    joinedGames: getItem("joinedGames", []),
  };

  componentDidMount() {
    getGame(this.props.match.params.gameID)
      .then(({ players }) => {
        const owner = players[0];
        this.setState({ players, owner });
      })
      .catch((e) => {
        this.setState({ hasError: true, error: e });
        console.log("Error fetching game", e);
      })
      .finally(() => this.setState({ loading: false }));
  }

  handlePlayerName = (event) => {
    const playerName = event.target.value;
    this.setState({ playerName });
    setItem("playerName", playerName);
  };

  handleJoinGame = async (gameID, playerID) => {
    // TODO refactor this
    try {
      const { playerName, joinedGames } = this.state;
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
      console.warn(`Could not join to game ${gameID}`, e);
    }
  };

  render() {
    const { gameID } = this.props.match.params;
    const { hasError, error, loading, playerName, players } = this.state;

    if (loading) {
      return (
        <div className={"flex p-4 items-center"}>
          <div className="flex-1 m-1 flex flex-col left">
            <div className={"my-4"}>
              <div className={"my-4"}>
                <Icon icon={faCircleNotch} spin /> Verificando acceso a la
                sala...
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (hasError) {
      const message =
        error.status === NOT_FOUND
          ? "Sala no encontrada"
          : "Ocurrió un error desconocido";
      return (
        <div className={"flex p-4 items-center"}>
          <div className="flex-1 m-1 flex flex-col left">
            <div className={"my-4"}>
              <div className={"my-4"}>
                <Icon icon={faExclamationTriangle} /> {message}
              </div>
              <Link to={"/"}>
                <button className={"button"}>Volver al menú principal</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

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

          <GameAvailableComponent
            key={gameID}
            gameID={gameID}
            players={players}
            disabled={playerName.length === 0}
            onJoin={this.handleJoinGame}
          />
        </div>
      </div>
    );
  }
}
