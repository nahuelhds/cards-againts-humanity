import React from "react";

import styles from "./PositionsTable.module.css";

export const PositionsTable = ({ wonBlackCards, playerIDs }) => {
  const positions = playerIDs.map((playerID) => ({
    playerID,
    count: wonBlackCards[playerID].length,
  }));
  positions.sort((a, b) => b.count - a.count);
  return (
    <div className="md:absolute md:top-0 md:right-0 md:z-20">
      <ul
        className={`${styles.list} bg-blue-400 text-blue-900 hover:bg-blue-600 hover:text-blue-200
        m-1 sm:m-2 text-center text-lg lg:text-xl shadow-lg`}
      >
        {positions.map(({ playerID, count }) => (
          <li key={`position-${playerID}`} className="p-2 lg:px-4">
            <div className="inline-block mr-2 lg:mr-4">Jugador #{playerID}</div>
            <span className="inline-block bg-white text-blue-900 px-1 rounded-full w-24 font-bold">
              {count}pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
