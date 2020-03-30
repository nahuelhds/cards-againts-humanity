import { TurnOrder } from "boardgame.io/core";
import shuffle from "lodash/shuffle";
import {
  MAX_WHITE_CARDS,
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
} from "./constants";
import {
  DrawABlackCard,
  ChangeWhiteCard,
  SelectWhiteCard,
  ChangeWinner,
  SelectWinner,
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
        moves: { ChangeWhiteCard, SelectWhiteCard },
      },
      [STAGE_CHOOSING_WINNER]: {
        moves: { ChangeWinner, SelectWinner },
      },
      [STAGE_CHOSEN_WINNER]: {
        moves: { EndThisTurn },
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
  const selectedWhiteCards = {};
  const chosenWhiteCard = {};
  ctx.playOrder.forEach((playerID) => {
    hands[playerID] = [];
    wonBlackCards[playerID] = [];
    selectedWhiteCards[playerID] = null;
    chosenWhiteCard[playerID] = null;
  });

  return {
    endThisTurn: false,
    activeBlackCard: null,
    selectedwhiteCardsOrder: shuffle([...ctx.playOrder]),
    selectedWhiteCards,
    chosenWhiteCard,
    allWhiteCardsAreSelected: false,
    chosenWinnerID: null,
    winnerPlayerID: null,
    wonBlackCards,
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
  const selectedWhiteCards = {};
  const chosenWhiteCard = {};
  ctx.playOrder.forEach((playerID) => {
    selectedWhiteCards[playerID] = null;
    chosenWhiteCard[playerID] = null;
  });
  return {
    ...G,
    activeBlackCard: null,
    selectedwhiteCardsOrder: shuffle([...ctx.playOrder]),
    allWhiteCardsAreSelected: false,
    chosenWinnerID: null,
    winnerPlayerID: null,
    endThisTurn: false,
    selectedWhiteCards,
    chosenWhiteCard,
  };
}
