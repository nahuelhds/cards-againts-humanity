import { STAGE_CHOOSE_WINNER } from "./constants";

export const DrawABlackCard = (G, ctx) => {
  const blackDeck = [...G.blackDeck];
  const activeBlackCard = blackDeck.shift();
  ctx.events.setStage(STAGE_CHOOSE_WINNER);
  return {
    ...G,
    activeBlackCard,
    blackDeck,
  };
};

export const SelectWhiteCard = (G, ctx, playerID, selectedWhiteCard) => {
  const hands = {
    ...G.hands,
    [playerID]: [...G.hands[playerID]].filter(
      (whiteCard) => whiteCard !== selectedWhiteCard
    ),
  };
  const selectedWhiteCards = {
    ...G.selectedWhiteCards,
    [playerID]: selectedWhiteCard,
  };

  return {
    ...G,
    hands,
    selectedWhiteCards,
    allWhiteCardsAreSelected:
      Object.values(selectedWhiteCards).length === ctx.playOrder.length - 1,
  };
};

export const ChooseWinner = (G, ctx, playerID) => {
  return {
    ...G,
    winnerPlayerID: playerID,
    wonBlackCards: {
      ...G.wonBlackCards,
      [playerID]: [...G.wonBlackCards[playerID], G.activeBlackCard],
    },
  };
};

export const EndThisTurn = (G, ctx) => {
  return {
    ...G,
    endThisTurn: true,
  };
};
