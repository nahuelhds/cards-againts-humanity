import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PlayerSelectionContainer extends Component {
  render() {
    return (
      <div className="flex flex-row h-screen bg-gray-200">
        <Link
          to="/game/default/size/4/player/0"
          className="flex-1 flex justify-center items-center text-3xl text-gray-700 bg-gray-400 m-4"
        >
          Jugador 0
        </Link>
        <Link
          to="/game/default/size/4/player/1"
          className="flex-1 flex justify-center items-center text-3xl text-gray-700 bg-gray-400 m-4"
        >
          Jugador 1
        </Link>
        <Link
          to="/game/default/size/4/player/2"
          className="flex-1 flex justify-center items-center text-3xl text-gray-700 bg-gray-400 m-4"
        >
          Jugador 2
        </Link>
        <Link
          to="/game/default/size/4/player/3"
          className="flex-1 flex justify-center items-center text-3xl text-gray-700 bg-gray-400 m-4"
        >
          Jugador 3
        </Link>
      </div>
    );
  }
}