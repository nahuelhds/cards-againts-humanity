import React, { Component } from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { GameCardsAgainstHumanity } from "./CardsAgainstHumanity/game";
import BoardContainer from "./CardsAgainstHumanity/Board";

import { getItem } from "../services/storage";
import { getGame } from "../services/lobby";

// Try joining first, the...
// Redirect to room/:gameID/:playerID/:secret

export default class RoomContainer extends Component {
  state = {
    loading: true,
    numPlayers: getItem("numPlayers", null),
    playerID: getItem("playerID", null),
    playerName: getItem("playerName", ""),
    playerCredentials: getItem("playerCredentials", null),
    players: [],
    owner: {},
    error: false,
  };

  componentDidMount() {
    if (this.state.playerCredentials === null) {
      this.props.history.redirect("/");
      return;
    }

    getGame(this.props.match.params.gameID)
      .then(({ players }) => {
        const owner = players.shift();
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
      numPlayers,
      playerID,
      playerName,
      playerCredentials,
      players,
      owner,
    } = this.state;

    if (
      !loading &&
      numPlayers !== null &&
      playerID !== null &&
      playerName !== "" &&
      playerCredentials !== null
    ) {
      const params = new URLSearchParams(this.props.location.search);
      const debug = params.get("debug") === "true";
      const reduxDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

      const CardsAgainstHumanityClient = Client({
        board: BoardContainer,
        game: GameCardsAgainstHumanity,
        numPlayers: parseInt(numPlayers),
        debug,
        enhancer: reduxDevToolsExtension && reduxDevToolsExtension(),
        multiplayer: SocketIO({
          server: process.env.REACT_APP_MULTIPLAYER_SERVER || "localhost:8000",
        }),
      });

      return (
        <CardsAgainstHumanityClient
          credentials={playerCredentials}
          gameID={this.props.match.params.gameID}
          gameMetadata={{ players }}
          playerID={playerID.toString()}
        />
      );
    }

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
          </div>
        </div>
      </div>
    );
  }
}
