// src/App.js

import React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { CardsAgainstHumanity } from "./game";
import BoardContainer from "./board";

const CardsAgainstHumanityClient = Client({
  board: BoardContainer,
  debug: true,
  game: CardsAgainstHumanity,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  numPlayers: 3,
});

export default class CardsAgainstHumanityApp extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Jugar como...</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Jugador 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Jugador 1
          </button>
          <button onClick={() => this.setState({ playerID: "2" })}>
            Jugador 2
          </button>
        </div>
      );
    }
    return (
      <div>
        <CardsAgainstHumanityClient playerID={this.state.playerID} />
      </div>
    );
  }
}
