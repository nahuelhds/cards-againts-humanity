import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { TextField } from "@material-ui/core";
import { createGame } from "../../services/lobby";

export class GameCreation extends Component {
  static propsTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  state = {
    size: "3",
  };

  handleSizeChange = (event) => this.setState({ size: event.target.value });
  handleGameCreation = () => {
    createGame({ numPlayers: this.state.size }).then(({ gameID }) =>
      this.props.onCreate(gameID)
    );
  };

  render() {
    return (
      <Fragment>
        <h2 className={"text-3xl"}>Crear sala</h2>
        <TextField
          label={"Cantidad de jugadores"}
          noValidate
          type={"number"}
          min={3}
          max={20}
          value={this.state.size}
          onChange={this.handleSizeChange}
        />
        <div className={"flex"}>
          <button
            className={`w-64 my-2 p-2
            bg-green-600 text-green-200 text-3xl
            rounded-r-lg shadow-lg `}
            onClick={this.handleGameCreation}
          >
            Crear
          </button>
        </div>
      </Fragment>
    );
  }
}
