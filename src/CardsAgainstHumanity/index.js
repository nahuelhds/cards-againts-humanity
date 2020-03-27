// src/App.js

import React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { CardsAgainstHumanity } from "./game";
import { CardsAgainstHumanityBoard } from "./board";

const CardsAgainstHumanityClient = Client({
  board: CardsAgainstHumanityBoard,
  debug: true,
  game: CardsAgainstHumanity,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  numPlayers: 3
});

export default class CardsAgainstHumanityApp extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
          <button onClick={() => this.setState({ playerID: "2" })}>
            Player 2
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
