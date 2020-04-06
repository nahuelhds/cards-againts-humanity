import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import logger from "redux-logger";
import { applyMiddleware, compose } from "redux";

import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { GameCardsAgainstHumanity } from "./CardsAgainstHumanity/game";
import BoardContainer from "./CardsAgainstHumanity/Board";

import { getItem } from "../services/storage";
import { getGame } from "../services/lobby";

export default class RoomContainer extends Component {
  state = {
    loading: true,
    playerID: getItem("playerID", null),
    playerName: getItem("playerName", ""),
    playerCredentials: getItem("playerCredentials", null),
    players: [],
    owner: {},
    error: false,
  };

  componentDidMount() {
    getGame(this.props.match.params.gameID)
      .then(({ players }) => {
        const owner = players[0];
        this.setState({ players, owner });

        const foundPlayer = players.find(
          (player) => player.name === this.state.playerName
        );

        if (foundPlayer && foundPlayer.id) {
          this.setState({ playerID: foundPlayer.id });
        }
      })
      .catch((err) => {
        this.setState({ error: true });
        console.warn(err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const {
      loading,
      playerID,
      playerName,
      playerCredentials,
      players,
      owner,
    } = this.state;

    if (playerCredentials === null) {
      return <Redirect to={"/"} />;
    }

    const allPlayersAreReady =
      !loading &&
      players.filter((player) => !!player.name).length === players.length;
    if (loading || !allPlayersAreReady) {
      const joinedPlayers = players.filter((player) => player.name);
      const emptySeatsCount = players.length - joinedPlayers.length;
      return (
        <div className={"flex p-4 items-center"}>
          <div className="flex-1 m-1 flex flex-col left">
            <div className={"my-4"}>
              <h2 className={"text-2xl"}>
                Sala de <strong>{owner.name}</strong>
              </h2>
              {loading && (
                <div className={"my-4"}>
                  <Icon icon={faCircleNotch} spin /> Verificando acceso a la
                  sala...
                </div>
              )}
              {!loading && (
                <Fragment>
                  <ul>
                    {players
                      .filter((player) => player.name)
                      .map((player) => (
                        <li key={`player-${player.id}`}>
                          {player.name === playerName ? (
                            <strong>{player.name}</strong>
                          ) : (
                            player.name
                          )}
                        </li>
                      ))}
                  </ul>
                  <p className={"my-2"}>
                    <Icon icon={faCircleNotch} spin />
                    <span>
                      {" "}
                      Esperando que se unan {emptySeatsCount} jugadores más...
                    </span>
                  </p>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (playerID === null) {
      return;
    }

    const params = new URLSearchParams(this.props.location.search);
    const debug = params.get("debug") === "true";
    const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    const CardsAgainstHumanityClient = Client({
      board: BoardContainer,
      enhancer: compose(
        applyMiddleware(logger),
        reduxDevToolsExtension && reduxDevToolsExtension()
      ),
      debug,
      game: GameCardsAgainstHumanity,
      multiplayer: SocketIO({
        server: process.env.REACT_APP_MULTIPLAYER_SERVER || "localhost:8000",
      }),
      numPlayers: players.length,
    });

    return (
      <CardsAgainstHumanityClient
        credentials={playerCredentials}
        gameID={this.props.match.params.gameID}
        playerID={playerID.toString()}
      />
    );
  }
}
