import React from "react";

import styles from "./PositionsTable.module.css";

export const PositionsTable = ({ wonBlackCards, playerIDs }) => {
  const positions = playerIDs.map((playerID) => ({
    playerID,
    count: wonBlackCards[playerID].length,
  }));
  positions.sort((a, b) => b.count - a.count);
  return (
    <div className="text-center sm:absolute sm:top-0 sm:right-0 sm:z-20">
      <ul
        className={`${styles.list} bg-blue-400 text-blue-900 hover:bg-blue-600 hover:text-blue-200 rounded m-2 p-1 shadow-md`}
      >
        {positions.map(({ playerID, count }) => (
          <li key={`position-${playerID}`} className=" p-1 md:px-4 md:py-2">
            <span className="inline-block bg-white text-blue-900 px-2 rounded-full uppercase w-16 font-bold">
              {count}
            </span>
            <div className="inline-block ml-4">Jugador #{playerID}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
