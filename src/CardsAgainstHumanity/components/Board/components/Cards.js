import React from "react";
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
      <div className={"absolute top-0 left-0 p-4 text-left"}>{text}</div>
    </button>
  );
};

export const BlackCard = ({ text }) => (
  <div className={`bg-black w-64 h-64 p-8 rounded shadow-lg`}>
    <div className={`text-white font-bold text-xl`}>{sanitizeText(text)}</div>
  </div>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
