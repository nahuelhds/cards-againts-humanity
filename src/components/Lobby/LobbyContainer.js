import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { Container, TextField, Paper } from "@material-ui/core";
import { GameCreation } from "./GameCreation";

export default class LobbyContainer extends Component {
  state = {
    username: "",
    gameID: "",
  };

  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleGameCreation = (gameID) => {
    this.setState({ gameID });
  };

  render() {
    const { username, gameID } = this.state;
    return (
      <Paper>
        <Container>
          <TextField
            label={"Nombre o apodo"}
            noValidate
            value={username}
            onChange={this.handleUsername}
          />
          {!gameID && <GameCreation onCreate={this.handleGameCreation} />}
          <AvailableGames myGameID={gameID} />
        </Container>
      </Paper>
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
