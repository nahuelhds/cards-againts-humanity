import React, { Fragment } from "react";
import { WhiteCard } from "./Cards.js";
import { STAGE_WHITE_CARDS_SELECTION } from "../../../constants.js";
export const MyHand = ({
  stage,
  cards,
  isMyTurn,
  onSelect,
  onSubmit,
  selectedCard,
  isSelectedCardSent,
}) => {
  const buttonStyles = selectedCard
    ? "bg-green-500 hover:bg-green-600 text-green-100"
    : "bg-green-400 text-gray-200 cursor-not-allowed";
  return (
    <div className="fixed w-screen bottom-0 left-0">
      {!isSelectedCardSent &&
        !isMyTurn &&
        stage === STAGE_WHITE_CARDS_SELECTION && (
          <button
            className={`${buttonStyles} p-4 m-2 rounded text-xl w-64`}
            disabled={!selectedCard}
            onClick={onSubmit}
          >
            Enviar respuesta
          </button>
        )}
      <div className="flex overflow-x-auto overflow-y-visible">
        {cards.map((cardText, index) => (
          <WhiteCard
            key={`white-card-${index}`}
            text={cardText}
            selected={selectedCard === cardText}
            disabled={isMyTurn}
            transform={`transform translate-y-12 ${
              !isMyTurn && "hover:translate-y-0"
            }`}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};
