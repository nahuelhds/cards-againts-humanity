import React, { PureComponent } from "react";
import { Link, Redirect } from "react-router-dom";

import { NOT_FOUND } from "http-status-codes";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import GameNotReadyComponent from "./GameNotReadyComponent";
import GameBoardContainer from "./GameBoardContainer";

import { getItem, setItem } from "../services/storage";
import { getGame } from "../services/lobby";

export default class GameAuthContainer extends PureComponent {
  state = {
    loading: true,
    joinedGames: getItem("joinedGames", []),
    playerIsFound: false,
    foundPlayer: {},
    players: [],
    hasError: false,
    error: {},
  };

  componentDidMount() {
    this.checkGameStatus();
  }

  checkGameStatus = () => {
    const { gameID } = this.props.match.params;
    const { joinedGames } = this.state;
    let joinedGame = joinedGames.find((game) => game.gameID === gameID);
    getGame(gameID)
      .then(({ players }) => {
        const foundPlayer = players.find(
          (player) =>
            player.id === joinedGame.playerID &&
            player.name === joinedGame.playerName
        );

        this.setState({
          players,
          allPlayersAreReady:
            players.filter((player) => !!player.name).length === players.length,
          playerIsFound: !!foundPlayer,
          foundPlayer: foundPlayer ? joinedGame : {},
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({ hasError: true, error: e, loading: false });
        console.log("Error fetching game", e);
      })
      .finally(() => {
        setTimeout(() => {
          this.checkGameStatus();
        }, 3000);
      });
  };

  render() {
    const { gameID, playerID: urlPlayerID } = this.props.match.params;
    const {
      loading,
      hasError,
      error,
      players,
      allPlayersAreReady,
      playerIsFound,
      foundPlayer,
    } = this.state;

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

    if (!playerIsFound) {
      return <Redirect to={`/games/${gameID}`} />;
    }

    // If the player is there but the URL is wrong...
    if (foundPlayer.playerID !== parseInt(urlPlayerID)) {
      return (
        <Redirect to={`/games/${gameID}/player/${foundPlayer.playerID}`} />
      );
    }

    if (!allPlayersAreReady) {
      return (
        <GameNotReadyComponent
          players={players}
          playerName={foundPlayer.playerName}
          invitationUrl={`${window.location.origin}/games/${gameID}`}
        />
      );
    }

    setItem("numPlayers", players.length);

    return (
      <GameBoardContainer
        gameID={gameID}
        playerID={foundPlayer.playerID}
        playerCredentials={foundPlayer.playerCredentials}
        numPlayers={players.length}
      />
    );
  }
}
