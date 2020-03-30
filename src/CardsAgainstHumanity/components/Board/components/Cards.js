import React, { Fragment } from "react";
import styles from "./Cards.module.css";

export const WhiteCard = ({ transform, text }) => (
  <div
    className={`${styles.whiteCard} bg-white w-32 h-48 p-4 m-1 rounded shadow-lg ${transform} `}
  >
    <div className={`text-black font-bold text-lg`}>{text}</div>
  </div>
);

export const BlackCard = ({ text }) => (
  <div className={`bg-black w-48 h-64 p-8 rounded shadow-lg`}>
    <div className={`text-white font-bold text-xl`}>{sanitizeText(text)}</div>
  </div>
);

const sanitizeText = (text) => text.replace("{whiteCard}", "______________");
