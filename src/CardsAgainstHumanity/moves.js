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

  const allWhiteCardsAreSelected =
    Object.values(selectedWhiteCards).filter((text) => text !== null).length ===
    ctx.playOrder.length - 1;

  if (allWhiteCardsAreSelected) {
    ctx.events.setActivePlayers({ all: STAGE_CHOOSING_WINNER });
  }

  return {
    ...G,
    hands,
    // TODO: shuffle this
    // selectedWhiteCards: shuffle(
    //   Object.keys(selectedWhiteCards)
    // ).map((playerID) => ({ [playerID]: selectedWhiteCards[playerID] })),
    selectedWhiteCards,
    allWhiteCardsAreSelected,
  };
};

export const ChooseWinner = (G, ctx, playerID) => {
  ctx.events.setActivePlayers({ all: STAGE_CHOSEN_WINNER });
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
