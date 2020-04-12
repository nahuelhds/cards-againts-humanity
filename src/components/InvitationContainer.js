import React, { Component } from "react";
import { getGame, joinGame } from "../services/lobby";
import { getItem, setItem } from "../services/storage";
import GameAvailableComponent from "./GameAvailableComponent";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { CONFLICT, NOT_FOUND } from "http-status-codes";
import { Link, Redirect } from "react-router-dom";

export default class InvitationContainer extends Component {
  state = {
    loading: true,
    hasError: false,
    errorMessage: null,
    playerName: getItem("playerName", ""),
    joinedGames: getItem("joinedGames", []),
    joinedGame: {},
    players: [],
    redirectToGameBoard: false,
  };

  componentDidMount() {
    const { gameID } = this.props.match.params;
    const { joinedGames } = this.state;

    const joinedGame = joinedGames.find((game) => game.gameID === gameID);
    if (joinedGame) {
      this.setState({ redirectToGameBoard: true, joinedGame });
      return;
    }

    getGame(gameID)
      .then(({ players }) => {
        const owner = players[0];
        this.setState({ players, owner });
      })
      .catch((e) => {
        const errorMessage =
          e.status === NOT_FOUND
            ? "Sala no encontrada"
            : "Ocurrió un error desconocido";
        this.setState({ hasError: true, errorMessage });
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
    const { playerName, joinedGames, players } = this.state;
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

      this.setState({ redirectToGameBoard: true, joinedGame });
    } catch (e) {
      // If join action fails and there is an empty seat yet
      if (e.status === CONFLICT && playerID < players.length) {
        return this.handleJoinGame(gameID, playerID + 1);
      }
      this.setState({ hasError: true, errorMessage: "La sala está llena" });
      console.warn(`Could not join to game ${gameID}`, e);
    }
  };

  render() {
    const { gameID } = this.props.match.params;
    const {
      hasError,
      errorMessage,
      loading,
      playerName,
      players,
      redirectToGameBoard,
      joinedGame,
    } = this.state;

    if (redirectToGameBoard) {
      return <Redirect to={`/games/${gameID}/player/${joinedGame.playerID}`} />;
    }

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
      return (
        <div className={"flex p-4 items-center"}>
          <div className="flex-1 m-1 flex flex-col left">
            <div className={"my-4"}>
              <div className={"my-4"}>
                <Icon icon={faExclamationTriangle} /> {errorMessage}
              </div>
              <Link to={"/"}>
                <button className={"button success"}>
                  Volver al menú principal
                </button>
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
