import React from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faSpinner,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Cards.module.css";

export const WhiteCard = ({ disabled, onSelect, transform, text }) => {
  let bg = disabled ? "bg-gray-300" : "bg-white";
  let color = disabled ? "text-gray-500" : "text-black";
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";
  // TODO: horizontal scroll
  return (
    <button
      className={`${styles.whiteCard} ${cursor} ${bg} ${color} flex-shrink-0 font-bold text-md w-32 h-56 md:w-48 md:h-64 m-1 relative shadow-lg ${transform}`}
      disabled={disabled}
      onClick={() => onSelect(text)}
    >
      <div className={"absolute top-0 left-0 p-4 text-left w-full"}>{text}</div>
    </button>
  );
};

export const SelectedWhiteCard = ({
  isMyTurn,
  isMine,
  show,
  waitingForPlayers,
  onSelect,
  onSubmit,
  selected,
  isSelectable,
  text,
  winner,
  winnerPlayerID,
}) => {
  let bg = !isMyTurn ? "bg-gray-200" : "bg-white";
  let color = !isMyTurn ? "text-gray-800" : "text-black";
  const cursor = !isMyTurn ? "cursor-not-allowed" : "cursor-pointer";

  bg = isMyTurn && selected ? "bg-blue-200" : bg;
  color = isMyTurn && selected ? "text-blue-600" : color;

  bg = winner ? "bg-green-600" : bg;
  color = winner ? "text-green-100" : color;

  return (
    <div className="w-64 h-96 m-2 flex flex-col">
      <button
        className={`${styles.whiteCard} ${cursor} ${bg} ${color} flex-1 font-bold text-md shadow-lg h-full w-full relative`}
        disabled={!isMyTurn}
        onClick={!winnerPlayerID && isSelectable ? onSelect : undefined}
      >
        {!show && waitingForPlayers && text === null && (
          <div className={`p-8 text-center text-xl`}>
            <Icon icon={faSpinner} spin className={`text-3xl mb-2`}></Icon>
            <p>Esperando cartas...</p>
          </div>
        )}
        {!show && waitingForPlayers && text !== null && !isMine && (
          <div className={`p-8 text-center text-xl`}>
            <Icon icon={faCheck} className={`text-3xl mb-2`}></Icon>
            <p>Carta entregada</p>
          </div>
        )}
        {!show && !waitingForPlayers && (
          <div className={`p-8 text-center text-xl`}>
            <Icon icon={faQuestion} className={`text-3xl mb-2`}></Icon>
            <p>Esperando respuesta...</p>
          </div>
        )}
        {show && (
          <div
            className={"absolute p-8 top-0 left-0 p-4 text-left w-full text-xl"}
          >
            {text}
          </div>
        )}
      </button>
      {show && !winner && isMyTurn && selected && (
        <button
          className={`text-xl h-16 bg-blue-600 text-blue-100 hover:bg-blue-800 hover:text-blue-100`}
          onClick={onSubmit}
        >
          Elegir como ganadora
        </button>
      )}
      {show && winner && (
        <div
          className={`text-xl h-16 bg-green-100 text-green-600 text-center flex items-center justify-center`}
        >
          Jugador #{winnerPlayerID}
        </div>
      )}
    </div>
  );
};

export const BlackCard = ({ text }) => (
  <div className={`bg-black w-64 h-96 p-8 rounded shadow-lg`}>
    <div className={`text-white font-bold text-xl`}>{sanitizeText(text)}</div>
  </div>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
