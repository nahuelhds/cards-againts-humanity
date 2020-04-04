import React, { Component } from "react";
import PropTypes from "prop-types";

export class GameCreation extends Component {
  static propsTypes = {
    disabled: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
    onCreate: () => null,
  };

  state = {
    size: "2",
  };

  handleSizeChange = (event) => this.setState({ size: event.target.value });

  render() {
    return (
      <div className={"my-4"}>
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
            className={`button success rounder-r`}
            disabled={this.props.disabled}
            onClick={this.props.onCreate}
          >
            Crear
          </button>
        </div>
      </div>
    );
  }
}
