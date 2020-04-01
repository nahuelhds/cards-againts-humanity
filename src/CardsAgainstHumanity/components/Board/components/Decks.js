import React from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faQuestion, faHandPointDown } from "@fortawesome/free-solid-svg-icons";

// w-32 h-56 md:w-48 md:h-64
export const BlackDeck = () => (
  <div className={`w-64 h-96 bg-gray-600 rounded shadow-md flex items-center`}>
    <div className={`flex-1 text-center text-gray-100 text-xl`}>
      <Icon icon={faQuestion} className={`text-5xl mb-2`}></Icon>
      <p>Esperando...</p>
    </div>
  </div>
);

export const ActionableBlackDeck = ({ onClick }) => (
  <button
    className={`w-64 h-96 bg-gray-900 hover:bg-black text-gray-300 hover:text-white rounded-lg shadow-md text-xl`}
    onClick={onClick}
  >
    <Icon icon={faHandPointDown} className={`text-5xl mb-2`}></Icon>
    <p>Levantar carta</p>
  </button>
);
