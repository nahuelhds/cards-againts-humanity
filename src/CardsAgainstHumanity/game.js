import { TurnOrder } from "boardgame.io/core";
import shuffle from "lodash/shuffle";
import {
  MAX_WHITE_CARDS,
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSE_WINNER,
} from "./constants";
import {
  DrawABlackCard,
  SelectWhiteCard,
  ChooseWinner,
  EndThisTurn,
} from "./moves";

import theBlackDeck from "./assets/decks/es_AR/black";
import theWhiteDeck from "./assets/decks/es_AR/white";

export const CardsAgainstHumanity = {
  name: "cards-against-humanity",
  setup: SetupState,
  turn: {
    order: TurnOrder.DEFAULT,
    activePlayers: {
      all: STAGE_DRAW_BLACK_CARD,
    },
    stages: {
      [STAGE_DRAW_BLACK_CARD]: {
        moves: { DrawABlackCard },
      },
      [STAGE_WHITE_CARDS_SELECTION]: {
        moves: { SelectWhiteCard },
      },
      [STAGE_CHOOSE_WINNER]: {
        moves: { ChooseWinner, EndThisTurn },
      },
    },
    onBegin: RefillHands,
    endIf: (G, ctx) => G.endThisTurn,
    onEnd: PrepareStateForNextTurn,
  },
};

function SetupState(ctx) {
  const hands = {};
  const wonBlackCards = {};
  ctx.playOrder.forEach((playerID) => {
    hands[playerID] = [];
    wonBlackCards[playerID] = [];
  });
  return {
    activeBlackCard: null,
    allWhiteCardsAreSelected: false,
    selectedWhiteCards: {},
    winnerPlayerID: null,
    wonBlackCards,
    endThisTurn: false,
    hands,
    blackDeck: shuffle(theBlackDeck),
    whiteDeck: shuffle(theWhiteDeck),
  };
}

function RefillHands(G, ctx) {
  const whiteDeck = [...G.whiteDeck];
  const hands = ctx.playOrder.map((playerID) => {
    const playerHand = [...G.hands[playerID]];
    while (playerHand.length < MAX_WHITE_CARDS) {
      playerHand.push(whiteDeck.shift());
    }
    return playerHand;
  });

  return {
    ...G,
    whiteDeck,
    hands,
  };
}

function PrepareStateForNextTurn(G, ctx) {
  return {
    ...G,
    activeBlackCard: null,
    allWhiteCardsAreSelected: false,
    selectedWhiteCards: {},
    winnerPlayerID: null,
    endThisTurn: false,
  };
}
