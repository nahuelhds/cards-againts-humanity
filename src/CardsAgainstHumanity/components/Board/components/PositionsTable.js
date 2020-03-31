import React from "react";

import styles from "./PositionsTable.module.css";

export const PositionsTable = ({ wonBlackCards, playerIDs }) => {
  const positions = playerIDs.map((playerID) => ({
    playerID,
    count: wonBlackCards[playerID].length,
  }));
  positions.sort((a, b) => b.count - a.count);
  return (
    <ul
      className={`${styles.list} bg-blue-400 text-blue-900 hover:bg-blue-600 hover:text-blue-200 rounded m-2 p-1 text-xl shadow-md`}
    >
      {positions.map(({ playerID, count }) => (
        <li className="px-4 py-2">
          <span className="inline-block bg-white text-blue-900 px-2 rounded-full uppercase w-16 text-center font-bold">
            {count}
          </span>
          <div className="inline-block ml-4">Jugador #{playerID}</div>
        </li>
      ))}
    </ul>
  );
};
