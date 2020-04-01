import shuffle from "lodash/shuffle";

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

export const SelectWhiteCard = (G, ctx, playerID, chosenWhiteCard) => {
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

  let selectedWhiteCardsOrder = [...G.selectedWhiteCardsOrder];
  if (allWhiteCardsAreSelected) {
    ctx.events.setActivePlayers({ all: STAGE_CHOOSING_WINNER });
    selectedWhiteCardsOrder = shuffle(selectedWhiteCardsOrder);
  }

  return {
    ...G,
    hands,
    selectedWhiteCardsOrder,
    selectedWhiteCards,
    allWhiteCardsAreSelected,
    chosenWhiteCard: {
      ...G.chosenWhiteCard,
      [playerID]: chosenWhiteCard,
    },
  };
};

export const SelectWinner = (G, ctx, playerID) => {
  ctx.events.setActivePlayers({ all: STAGE_CHOSEN_WINNER });
  return {
    ...G,
    chosenWinnerID: playerID,
    wonBlackCards: {
      ...G.wonBlackCards,
      [playerID]: [...G.wonBlackCards[playerID], G.activeBlackCard],
    },
  };
};

export const EndThisTurn = (G) => {
  return {
    ...G,
    endThisTurn: true,
  };
};
