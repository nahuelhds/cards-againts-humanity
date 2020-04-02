import React from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faSpinner,
  faCheck,
  faHandPointDown,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Cards.module.css";

const iconFond = `text-3xl lg:text-5xl`;

const BaseCard = ({
  className,
  outerMargin = "my-2",
  margin = "mx-2",
  padding = "p-4 md:p-7 lg:p-8",
  size = "w-40 h-56",
  children,
}) => (
  <div className={`${size} ${outerMargin}`}>
    <div
      className={`${margin} ${className} ${padding} h-full rounded shadow-md`}
    >
      {children}
    </div>
  </div>
);

export const HandCard = ({ disabled, onSelect, transform, text }) => {
  let bg = disabled ? "bg-gray-300" : "bg-white";
  let color = disabled ? "text-gray-500" : "text-black";
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";
  // TODO: horizontal scroll
  return (
    <button
      className={`w-32 h-56 m-1 flex-shrink-0 font-bold relative ${styles.whiteCard} ${cursor} ${bg} ${color}  ${transform}`}
      disabled={disabled}
      onClick={() => onSelect(text)}
    >
      <div className={"absolute top-0 left-0 p-4 text-left w-full"}>{text}</div>
    </button>
  );
};

export const WhiteCard = ({
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
    <BaseCard className={`${cursor} ${bg} ${color} text-center`}>
      <button
        className={`${styles.whiteCard} h-full font-bold text-md relative`}
        disabled={chosenWinnerID !== null || !isMyTurn}
        onClick={chosenWinnerID === null && isSelectable ? onSelect : undefined}
      >
        {!show && waitingForPlayers && text === null && (
          <div>
            <Icon icon={faSpinner} spin className={`${iconFond}  mb-2`}></Icon>
            <p>Esperando a Jugador #{cardPlayerID}...</p>
          </div>
        )}
        {!show && waitingForPlayers && text !== null && !isMine && (
          <div>
            <Icon icon={faCheck} className={`${iconFond}  mb-2`}></Icon>
            <p>Carta entregada</p>
          </div>
        )}
        {!show && !waitingForPlayers && (
          <div>
            <Icon icon={faQuestion} className={`${iconFond} mb-2`}></Icon>
            <p>Esperando respuesta...</p>
          </div>
        )}
        {show && (
          <div className={`absolute top-0 left-0 text-left w-full text-xl`}>
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
    </BaseCard>
  );
};

export const BlackCard = ({ text }) => (
  <BaseCard className={`bg-black h-full mb-4 rounded shadow-lg`}>
    <div className={`text-white font-bold`}>{sanitizeText(text)}</div>
  </BaseCard>
);

export const BlackDeck = () => (
  <BaseCard className={`bg-gray-600 rounded shadow-md flex items-center`}>
    <div className={`flex-1 text-center text-gray-100`}>
      <Icon icon={faQuestion} className={`${iconFond} mb-2`} />
      <p>Esperando...</p>
    </div>
  </BaseCard>
);

export const ActionableBlackDeck = ({ onClick }) => (
  <BaseCard
    className={`bg-gray-900 hover:bg-black text-gray-300 hover:text-white rounded-lg shadow-md`}
    onClick={onClick}
  >
    <Icon icon={faHandPointDown} className={`${iconFond} mb-2`} />
    <p>Levantar carta</p>
  </BaseCard>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
