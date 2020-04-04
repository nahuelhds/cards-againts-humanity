import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainMenuContainer extends Component {
  state = {
    playerName: "",
    gameID: "",
    size: "3",
  };

  handlePlayerName = (event) =>
    this.setState({ playerName: event.target.value });
  handleGameIDChange = (event) => this.setState({ gameID: event.target.value });
  handleSizeChange = (event) => this.setState({ size: event.target.value });

  render() {
    const { playerName, gameID, size } = this.state;
    return (
      <div className={"flex h-screen p-4 items-center text-xl"}>
        <div className="flex-1 flex flex-col left">
          <label>¿Cuál es tu nombre?</label>
          <input
            className={"flex-1 my-2 p-4 rounded-l-lg"}
            type={"text"}
            value={playerName}
            onChange={this.handlePlayerName}
          />
          <div className={"flex"}>
            <div className={"flex-1 flex flex-col text-left"}>
              <label>Nombre de la partida</label>
              <input
                className={"flex-1 my-2 p-4 rounded-l-lg"}
                type={"text"}
                value={gameID}
                onChange={this.handleGameIDChange}
              />
            </div>
            <div className={"flex flex-col"}>
              <label className={"text-right"}>Cant. Jugadores</label>
              <input
                type={"number"}
                min={3}
                max={20}
                className={"my-2 p-4 text-center rounded-r-lg"}
                value={size}
                onChange={this.handleSizeChange}
              />
            </div>
          </div>
          <p className={"text-sm text-right text-gray-800"}>
            El número de jugadores sólo se tendrá en cuenta si se está creando
            la sala
          </p>
          <Link
            className={"flex"}
            to={`/game/${encodeURIComponent(gameID)}/size/${parseInt(
              size
            )}/player/0/${encodeURIComponent(playerName)}`}
          >
            <button
              className={`flex-1 my-2 p-2
              bg-green-600 text-green-200 text-3xl
              rounded-lg shadow-lg `}
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
