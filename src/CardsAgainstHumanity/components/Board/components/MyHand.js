import React from "react";
import { WhiteCard } from "./WhiteCard.js";
export const MyHand = ({ whiteCards }) => (
  <div className="fixed w-screen bottom-0 left-0 flex overflow-x-auto">
    {whiteCards.map((cardText, index) => (
      <WhiteCard key={`white-card-${index}`}>{cardText}</WhiteCard>
    ))}
  </div>
);
