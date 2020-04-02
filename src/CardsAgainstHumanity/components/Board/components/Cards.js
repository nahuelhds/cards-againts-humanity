import React from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faSpinner,
  faCheck,
  faHandPointDown,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Cards.module.css";

const cardSize = `w-40 h-56 text-xs sm:text-md md:w-56 md:h-80 md:text-lg lg:w-64 lg:h-96 lg:text-xl`;
const cardIconFont = `text-3xl lg:text-5xl`;
const cardPadding = "p-6 md:p-7 lg:p-8";

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
  cardPlayerID,
  waitingForPlayers,
  onSelect,
  selected,
  isSelectable,
  text,
  winner,
  chosenWinnerID,
}) => {
  let bg = !isMyTurn ? "bg-gray-200" : "bg-white";
  let color = !isMyTurn ? "text-gray-800" : "text-black";
  const cursor = !isMyTurn ? "cursor-not-allowed" : "cursor-pointer";

  bg = isMyTurn && selected ? "bg-blue-200" : bg;
  color = isMyTurn && selected ? "text-blue-600" : color;

  bg = winner ? "bg-green-600" : bg;
  color = winner ? "text-green-100" : color;

  return (
    <div className={`${cardSize} m-2 flex flex-col`}>
      <button
        className={`${styles.whiteCard} ${cursor} ${bg} ${color} ${cardPadding} flex-1 font-bold text-md shadow-lg h-full w-full relative`}
        disabled={chosenWinnerID !== null || !isMyTurn}
        onClick={chosenWinnerID === null && isSelectable ? onSelect : undefined}
      >
        {!show && waitingForPlayers && text === null && (
          <div className={`text-center`}>
            <Icon
              icon={faSpinner}
              spin
              className={`${cardIconFont}  mb-2`}
            ></Icon>
            <p>Esperando a Jugador #{cardPlayerID}...</p>
          </div>
        )}
        {!show && waitingForPlayers && text !== null && !isMine && (
          <div className={`text-center`}>
            <Icon icon={faCheck} className={`${cardIconFont}  mb-2`}></Icon>
            <p>Carta entregada</p>
          </div>
        )}
        {!show && !waitingForPlayers && (
          <div className={`text-center`}>
            <Icon icon={faQuestion} className={`${cardIconFont} mb-2`}></Icon>
            <p>Esperando respuesta...</p>
          </div>
        )}
        {show && (
          <div
            className={`absolute ${cardPadding} top-0 left-0 text-left w-full text-xl`}
          >
            {text}
          </div>
        )}
      </button>
      {show && winner && (
        <div
          className={`text-xl h-16 bg-green-100 text-green-600 text-center flex items-center justify-center`}
        >
          Jugador #{chosenWinnerID}
        </div>
      )}
    </div>
  );
};

export const BlackCard = ({ text }) => (
  <div className={`${cardSize} ${cardPadding} bg-black rounded shadow-lg`}>
    <div className={`text-white font-bold`}>{sanitizeText(text)}</div>
  </div>
);

export const BlackDeck = () => (
  <div
    className={`${cardSize} ${cardPadding} bg-gray-600 rounded shadow-md flex items-center`}
  >
    <div className={`flex-1 text-center text-gray-100`}>
      <Icon icon={faQuestion} className={`${cardIconFont} mb-2`} />
      <p>Esperando...</p>
    </div>
  </div>
);

export const ActionableBlackDeck = ({ onClick }) => (
  <button
    className={`${cardSize} ${cardPadding} bg-gray-900 hover:bg-black text-gray-300 hover:text-white rounded-lg shadow-md`}
    onClick={onClick}
  >
    <Icon icon={faHandPointDown} className={`${cardIconFont} mb-2`} />
    <p>Levantar carta</p>
  </button>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
