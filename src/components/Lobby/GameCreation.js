import React, {Component} from "react";
import PropTypes from "prop-types";
import {createGame} from "../../services/lobby";

export class GameCreation extends Component {
  static propsTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  state = {
    size: "2",
  };

  handleSizeChange = (event) => this.setState({size: event.target.value});
  handleGameCreation = () => {
    createGame({numPlayers: this.state.size}).then(({gameID}) =>
      this.props.onCreate(gameID)
    );
  };

  render() {
    return (
      <div className={'my-4'}>
        <h2 className={"text-2xl"}>Crear sala</h2>
        <label>Cant. de jugadores</label>
        <div className={"flex"}>
          <input
            type={"number"}
            min={2}
            max={20}
            className={"flex-1 py-2 px-4 rounded-l"}
            value={this.state.size}
            onChange={this.handleSizeChange}
          />
          <button
            className={`py-2 px-4 md:px-8
            bg-green-600 text-green-200 text-xl md:text-3xl
            rounded-r shadow-lg `}
            onClick={this.handleGameCreation}
          >
            Crear
          </button>
        </div>
      </div>
    );
  }
}
