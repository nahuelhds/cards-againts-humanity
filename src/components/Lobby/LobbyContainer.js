import React, {Component} from "react";
import PropTypes from "prop-types";
import {GameCreation} from "./GameCreation";

export default class LobbyContainer extends Component {
  state = {
    playerName: "",
    gameID: "",
  };

  handlePlayerName = (event) =>
    this.setState({ playerName: event.target.value });

  handleGameCreation = (gameID) => {
    this.setState({ gameID });
  };

  render() {
    const { playerName, gameID } = this.state;
    return (
      <div className={"flex h-screen p-4 items-center text-xl"}>
        <div className="flex-1 flex flex-col left">
          <label>Nombre o apodo</label>
          <input
            className={"flex-1 my-2 p-4 rounded"}
            type={"text"}
            value={playerName}
            onChange={this.handlePlayerName}
          />
          {!gameID && <GameCreation onCreate={this.handleGameCreation} />}
          <AvailableGames myGameID={gameID} />
        </div>
      </div>
    );
  }
}

class AvailableGames extends Component {
  static propsTypes = {
    gameID: PropTypes.string,
  };

  render() {
    return `AVAILABLE GAMES ${this.props.gameID}`;
  }
}
