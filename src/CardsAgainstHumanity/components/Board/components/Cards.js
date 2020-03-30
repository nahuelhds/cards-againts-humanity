import React from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faQuestion, faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./Cards.module.css";

export const WhiteCard = ({
  disabled,
  onSelect,
  selected,
  transform,
  text,
}) => {
  let bg = disabled ? "bg-gray-200" : "bg-white";
  let color = disabled ? "text-gray-800" : "text-black";
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

  bg = selected ? "bg-blue-600" : bg;
  color = selected ? "text-blue-100" : color;
  // TODO: horizontal scroll
  return (
    <button
      className={`${styles.whiteCard} ${cursor} ${bg} ${color} font-bold text-md w-48 h-64 m-1 relative shadow-lg ${transform}`}
      disabled={disabled}
      onClick={() => onSelect(text)}
    >
      <div className={"absolute top-0 left-0 p-4 text-left w-full"}>{text}</div>
    </button>
  );
};

export const SelectedWhiteCard = ({
  isMyTurn,
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

  bg = selected ? "bg-blue-600" : bg;
  color = selected ? "text-blue-100" : color;

  bg = winner ? "bg-green-600" : bg;
  color = winner ? "text-green-100" : bg;

  return (
    <div className="flex flex-col">
      <button
        className={`${styles.whiteCard} ${cursor} ${bg} ${color} flex-1 font-bold text-md w-64 h-96 m-2 relative shadow-lg`}
        disabled={!isMyTurn}
        onClick={!winnerPlayerID && isSelectable ? onSelect : undefined}
      >
        {!show && waitingForPlayers && (
          <div className={`flex-1 p-8 text-center text-xl`}>
            <Icon icon={faSpinner} spin className={`text-3xl mb-2`}></Icon>
            <p>Esperando cartas...</p>
          </div>
        )}
        {!show && !waitingForPlayers && (
          <div className={`flex-1 p-8 text-center text-xl`}>
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
      {show && !winner && selected && (
        <button
          className={`text-xl h-16 m-2 -mt-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700`}
          onClick={onSubmit}
        >
          ¡Esta es la mejor!
        </button>
      )}
      {show && winner && (
        <div
          className={`text-xl h-16 m-2 -mt-2 bg-green-100 text-green-600 text-center flex items-center justify-center`}
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
