import React from "react";
import { STAGE_CHOOSING_WINNER, STAGE_CHOSEN_WINNER } from "../../../constants";
import { SelectedWhiteCard } from "./Cards";
export function SelectedWhiteCards({
  cards,
  playerID,
  isMyTurn,
  stage,
  selectedWinnerID,
  winnerPlayerID,
  handleWinnerSelection,
  handleSelectedWinner,
}) {
  return (
    <React.Fragment>
      {Object.keys(cards).map((cardPlayerID, index) => (
        <SelectedWhiteCard
          key={`white-card-${index}`}
          isMyTurn={isMyTurn}
          show={
            isMyTurn ||
            [STAGE_CHOOSING_WINNER, STAGE_CHOSEN_WINNER].indexOf(stage) > -1 ||
            cards[playerID] === cards[cardPlayerID]
          }
          text={cards[cardPlayerID]}
          selected={selectedWinnerID === cardPlayerID}
          winner={winnerPlayerID === cardPlayerID}
          onSelect={() => handleWinnerSelection(cardPlayerID)}
          onSubmit={handleSelectedWinner}
        />
      ))}
    </React.Fragment>
  );
}
