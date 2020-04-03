import React from "react";
import { HandCard } from "./Cards.js";

export const MyHand = ({ cards, isMyTurn, selected, onSelect }) => (
  <div className="fixed w-screen bottom-0 left-0 text-center z-10 scrolling-auto">
    <div className="flex overflow-x-scroll scrolling-auto">
      {cards.map((cardText, index) => (
        <HandCard
          key={`white-card-${index}`}
          text={cardText}
          disabled={selected || isMyTurn}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);
