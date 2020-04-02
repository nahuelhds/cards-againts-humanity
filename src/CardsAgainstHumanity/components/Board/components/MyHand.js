import React from "react";
import { HandCard } from "./Cards.js";

export const MyHand = ({ cards, isMyTurn, selected, onSelect }) => (
  <div className="fixed w-screen bottom-0 left-0 text-center">
    <div className="flex overflow-x-auto overflow-y-visible">
      {cards.map((cardText, index) => (
        <HandCard
          key={`white-card-${index}`}
          text={cardText}
          disabled={selected || isMyTurn}
          transform={`transform translate-y-12 ${
            !isMyTurn && "hover:translate-y-0"
          }`}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);
