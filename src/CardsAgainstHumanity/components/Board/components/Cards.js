import React, { Fragment } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faSpinner,
  faCheck,
  faHandPointDown,
} from "@fortawesome/free-solid-svg-icons";

const iconStyles = `text-3xl mx-auto my-2`;

export const HandCard = ({ disabled, onSelect, text }) => {
  let bg = disabled ? "bg-gray-300" : "bg-white";
  let color = disabled ? "text-gray-600" : "text-black";
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";
  return (
    <div
      className={`w-32 h-40 m-1 p-2 flex-shrink-0 font-bold text-left ${cursor} ${bg} ${color}`}
      onClick={disabled ? undefined : () => onSelect(text)}
    >
      {text}
    </div>
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
  let bg = !isMyTurn ? "bg-gray-400" : "bg-white";
  let color = !isMyTurn ? "text-gray-800" : "text-black";
  const cursor = !isMyTurn ? "cursor-not-allowed" : "cursor-pointer";

  bg = isMyTurn && selected ? "bg-blue-200" : bg;
  color = isMyTurn && selected ? "text-blue-600" : color;

  bg = winner ? "bg-green-600" : bg;
  color = winner ? "text-green-100" : color;

  return (
    <BaseCard
      className={`${cursor} ${bg} ${color} text-center relative flex`}
      disabled={chosenWinnerID !== null || !isMyTurn}
      onClick={chosenWinnerID === null && isSelectable ? onSelect : undefined}
    >
      {!show && (
        <div className={"flex-1 flex flex-col justify-center"}>
          {waitingForPlayers && text === null && (
            <Fragment>
              <Icon
                icon={faSpinner}
                spin
                className={`${iconStyles} mx-auto my-2`}
              />
              <p>Esperando a Jugador #{cardPlayerID}...</p>
            </Fragment>
          )}
          {waitingForPlayers && text !== null && !isMine && (
            <Fragment>
              <Icon icon={faCheck} className={`${iconStyles}`} />
              <p>Carta entregada</p>
            </Fragment>
          )}
          {!waitingForPlayers && (
            <Fragment>
              <Icon icon={faQuestion} className={`${iconStyles}`} />
              <p>Esperando respuesta...</p>
            </Fragment>
          )}
        </div>
      )}
      {show && (
        <div className={"flex-1 flex flex-col justify-between"}>
          <div className={`text-left`}>{text}</div>
          {winner && (
            <div className={`p-1 bg-green-100 text-green-600 text-center`}>
              Jugador #{chosenWinnerID}
            </div>
          )}
        </div>
      )}
    </BaseCard>
  );
};

export const BlackCard = ({ text }) => (
  <BaseCard className={`bg-black text-white`} textAlign={`text-left`}>
    {sanitizeText(text)}
  </BaseCard>
);

export const BlackDeck = () => (
  <BaseCard
    className={`bg-gray-600 text-gray-100 flex flex-col items-center justify-center`}
  >
    <Icon icon={faQuestion} className={`${iconStyles} `} />
    <p>Esperando...</p>
  </BaseCard>
);

export const ActionableBlackDeck = ({ onClick }) => (
  <BaseCard
    className={`bg-gray-900 text-gray-300 hover:bg-black hover:text-white flex flex-col items-center justify-center`}
    onClick={onClick}
  >
    <Icon icon={faHandPointDown} className={`${iconStyles}`} />
    <p>Levantar carta</p>
  </BaseCard>
);

const BaseCard = ({
  className,
  fontWeight = "font-bold",
  margin = "mx-2",
  outerMargin = "my-2",
  padding = "p-3 md:p-7 lg:p-8",
  size = "w-40 h-56",
  textAlign = "text-center",
  disabled = false,
  onClick = undefined,
  children,
}) => (
  <div className={`${size} ${outerMargin}`}>
    <div
      className={`${margin} ${className} ${padding} ${fontWeight} ${textAlign} h-full rounded shadow-md`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  </div>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
