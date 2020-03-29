import { TurnOrder } from "boardgame.io/core";
import {
  MAX_WHITE_CARDS,
  STAGE_CHOOSE_WINNER,
  STAGE_DRAW_BLACK_CARD,
  STAGE_SELECT_WHITE_CARDS,
} from "./constants";
import {
  DrawABlackCard,
  SelectWhiteCard,
  ChooseWinner,
  EndThisTurn,
} from "./moves";

import theBlackDeck from "./decks/es_AR/black";
import theWhiteDeck from "./decks/es_AR/white";

export const CardsAgainstHumanity = {
  name: "cards-against-humanity",
  setup: SetupState,
  turn: {
    order: TurnOrder.DEFAULT,
    activePlayers: {
      currentPlayer: {
        stage: STAGE_DRAW_BLACK_CARD,
        moveLimit: 1,
      },
      others: {
        stage: STAGE_SELECT_WHITE_CARDS,
        moveLimit: 1,
      },
    },
    stages: {
      [STAGE_DRAW_BLACK_CARD]: {
        moves: {
          DrawABlackCard,
        },
        next: STAGE_CHOOSE_WINNER,
      },
      [STAGE_SELECT_WHITE_CARDS]: {
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
    blackDeck: theBlackDeck,
    whiteDeck: theWhiteDeck,
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
