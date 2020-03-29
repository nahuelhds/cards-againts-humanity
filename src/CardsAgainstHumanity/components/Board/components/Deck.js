import React from "react";
export const BlackDeck = ({ deck, ...props }) => (
  <Deck deck={deck} bg={"bg-black"} color={"text-white"} {...props}></Deck>
);
export const WhiteDeck = ({ deck, ...props }) => (
  <Deck deck={deck} bg={"bg-white"} color={"text-gray-600"} {...props}></Deck>
);
const Deck = ({ bg, color, deck, className }) => (
  <div className={`${className} m-4 w-36 h-48 ${bg} rounded shadow-md`}>
    <div className="py-8 px-4 text-center">
      <div className={`${color} font-bold text-5xl mb-2`}>{deck.length}</div>
      <div className={`${color} text-lg`}>Cartas restantes</div>
    </div>
  </div>
);
