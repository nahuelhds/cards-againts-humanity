import React from "react";
import { STAGE_DRAW_BLACK_CARD } from "../../../constants";

import { ActionableBlackDeck, BlackDeck } from "./Decks";
import { BlackCard } from "./Cards";

export const BlackCardView = ({
  stage,
  isMyTurn,
  activeBlackCard,
  blackDeck,
  handleDrawBlackCard,
}) => (
  <div className={"m-2"}>
    {stage === STAGE_DRAW_BLACK_CARD && isMyTurn ? (
      <ActionableBlackDeck onClick={handleDrawBlackCard}></ActionableBlackDeck>
    ) : activeBlackCard ? (
      <BlackCard text={activeBlackCard} />
    ) : (
      <BlackDeck deck={blackDeck}></BlackDeck>
    )}
  </div>
);
