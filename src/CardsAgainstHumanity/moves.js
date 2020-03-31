// import shuffle from "lodash/shuffle";

import {
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
} from "./constants";

export const DrawABlackCard = (G, ctx) => {
  const blackDeck = [...G.blackDeck];
  const activeBlackCard = blackDeck.shift();
  ctx.events.setActivePlayers({ all: STAGE_WHITE_CARDS_SELECTION });
  return {
    ...G,
    activeBlackCard,
    blackDeck,
  };
};

export const ChangeWhiteCard = (G, ctx, playerID, chosenCard) => ({
  ...G,
  chosenWhiteCard: {
    ...G.chosenWhiteCard,
    [playerID]: chosenCard,
  },
});

export const SelectWhiteCard = (G, ctx, playerID) => {
  const chosenWhiteCard = G.chosenWhiteCard[playerID];
  const hands = {
    ...G.hands,
    [playerID]: [...G.hands[playerID]].filter(
      (whiteCard) => whiteCard !== chosenWhiteCard
    ),
  };
  const selectedWhiteCards = {
    ...G.selectedWhiteCards,
    [playerID]: chosenWhiteCard,
  };

  const allWhiteCardsAreSelected =
    Object.values(selectedWhiteCards).filter((text) => text !== null).length ===
    ctx.playOrder.length - 1;

  if (allWhiteCardsAreSelected) {
    ctx.events.setActivePlayers({ all: STAGE_CHOOSING_WINNER });
  }

  return {
    ...G,
    hands,
    selectedWhiteCards,
    allWhiteCardsAreSelected,
  };
};

export const ChangeWinner = (G, ctx, playerID) => ({
  ...G,
  chosenWinnerID: playerID,
});

export const SelectWinner = (G, ctx) => {
  ctx.events.setActivePlayers({ all: STAGE_CHOSEN_WINNER });
  return {
    ...G,
    winnerPlayerID: G.chosenWinnerID,
    wonBlackCards: {
      ...G.wonBlackCards,
      [G.chosenWinnerID]: [
        ...G.wonBlackCards[G.chosenWinnerID],
        G.activeBlackCard,
      ],
    },
  };
};

export const EndThisTurn = (G, ctx) => {
  return {
    ...G,
    endThisTurn: true,
  };
};
