import React, { Fragment } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

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
  onSelect,
  onSubmit,
  selected,
  text,
  winner,
}) => {
  let bg = !isMyTurn ? "bg-gray-200" : "bg-white";
  let color = !isMyTurn ? "text-gray-800" : "text-black";
  const cursor = !isMyTurn ? "cursor-not-allowed" : "cursor-pointer";

  bg = selected ? "bg-blue-600" : bg;
  color = selected ? "text-blue-100" : color;

  bg = winner ? "bg-green-600" : bg;
  color = winner ? "text-green-100" : bg;
  return (
    <button
      className={`${styles.whiteCard} ${cursor} ${bg} ${color} font-bold text-md w-64 h-96 m-2 relative shadow-lg`}
      disabled={!isMyTurn}
      onClick={onSelect}
    >
      {show && (
        <Fragment>
          <div className={"absolute top-0 left-0 p-4 text-left w-full text-xl"}>
            {text}
          </div>
          {!winner && selected && (
            <button
              className={`absolute bottom-0 left-0 p-4 w-full text-xl bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700`}
              onClick={onSubmit}
            >
              ¡Esta es la mejor!
            </button>
          )}
        </Fragment>
      )}
      {!show && (
        <div className={`flex-1 text-center text-xl`}>
          <Icon icon={faQuestion} className={`text-5xl mb-2`}></Icon>
          <p>Esperando...</p>
        </div>
      )}
    </button>
  );
};

export const BlackCard = ({ text }) => (
  <div className={`bg-black w-64 h-96 p-8 rounded shadow-lg`}>
    <div className={`text-white font-bold text-xl`}>{sanitizeText(text)}</div>
  </div>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
