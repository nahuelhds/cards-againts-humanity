import React from "react";
import styles from "./WhiteCard.module.css";

export const WhiteCard = ({ children }) => (
  <div
    className={`${styles.whiteCard} w-32 h-64 p-4 m-2 bg-white rounded shadow-lg transform translate-y-12 hover:translate-y-0`}
  >
    <div className={`font-bold text-black text-lg`}>{children}</div>
  </div>
);
