import React, { Fragment } from "react";
import { STAGE_CHOOSING_WINNER, STAGE_CHOSEN_WINNER } from "../../../constants";
import { SelectedWhiteCard } from "./Cards";
export function SelectedWhiteCards({
  stage,
  isMyTurn,
  playerID,
  cards,
  isSelectable,
  selectedWinnerID,
  winnerPlayerID,
  handleWinnerSelection,
  handleSelectedWinner,
}) {
  const show =
    isMyTurn ||
    [STAGE_CHOOSING_WINNER, STAGE_CHOSEN_WINNER].indexOf(stage) > -1;

  return (
    <Fragment>
      {Object.keys(cards).map((cardPlayerID, index) => (
        <SelectedWhiteCard
          key={`white-card-${index}`}
          isMyTurn={isMyTurn}
          show={show || cards[playerID] === cards[cardPlayerID]}
          text={cards[cardPlayerID]}
          isSelectable={isSelectable}
          selected={selectedWinnerID === cardPlayerID}
          winner={winnerPlayerID === cardPlayerID}
          winnerPlayerID={winnerPlayerID}
          onSelect={() => handleWinnerSelection(cardPlayerID)}
          onSubmit={handleSelectedWinner}
        />
      ))}
    </Fragment>
  );
}
