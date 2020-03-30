import React from "react";
import { WhiteCard } from "./Cards.js";
export const MyHand = ({ cards }) => (
  <div className="fixed w-screen bottom-0 left-0 flex overflow-x-auto">
    {cards.map((cardText, index) => (
      <WhiteCard
        key={`white-card-${index}`}
        transform={`transform translate-y-12 hover:translate-y-0`}
        text={cardText}
      ></WhiteCard>
    ))}
  </div>
);
