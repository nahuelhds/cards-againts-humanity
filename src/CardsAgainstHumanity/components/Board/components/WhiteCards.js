import React, { Fragment } from "react";
import {
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
} from "../../../constants";
import { SelectedWhiteCard } from "./Cards";

export function WhiteCards({
  stage,
  currentPlayer,
  isMyTurn,
  playerID,
  cardsOrder,
  cards,
  isSelectable,
  selectedWinnerID,
  winnerPlayerID,
  handleWinnerSelection,
  handleSelectedWinner,
}) {
  if (stage === STAGE_DRAW_BLACK_CARD) {
    return "";
  }

  const waitingForPlayers = stage === STAGE_WHITE_CARDS_SELECTION;
  const isChoosingWinner =
    [STAGE_CHOOSING_WINNER, STAGE_CHOSEN_WINNER].indexOf(stage) > -1;

  return (
    <Fragment>
      {cardsOrder.map(
        (cardPlayerID, index) =>
          cardPlayerID !== currentPlayer && (
            <SelectedWhiteCard
              key={`white-card-${index}`}
              isMyTurn={isMyTurn}
              waitingForPlayers={waitingForPlayers}
              isMine={playerID === cardPlayerID}
              show={
                (isMyTurn && !waitingForPlayers) ||
                isChoosingWinner ||
                (cards[cardPlayerID] !== null &&
                  cards[playerID] === cards[cardPlayerID])
              }
              text={cards[cardPlayerID]}
              isSelectable={isSelectable}
              selected={selectedWinnerID === cardPlayerID}
              winner={winnerPlayerID === cardPlayerID}
              winnerPlayerID={winnerPlayerID}
              onSelect={() => handleWinnerSelection(cardPlayerID)}
              onSubmit={handleSelectedWinner}
            />
          )
      )}
    </Fragment>
  );
}
