import { TurnOrder } from "boardgame.io/core";
import {
  MAX_WHITE_CARDS,
  STAGE_CHOOSE_BEST_COMBINATION,
  STAGE_DRAW_BLACK_CARD,
  STAGE_SELECT_WHITE_CARDS,
} from "./constants";
import { DrawBlackCard, SelectWhiteCard, ChooseBestCombination } from "./moves";

import blackDeck from "./decks/es_AR/black";
import whiteDeck from "./decks/es_AR/white";

export const CardsAgainstHumanity = {
  name: "cards-against-humanity",

  setup: (ctx) => {
    const hands = {};
    ctx.playOrder.forEach((playerID) => (hands[playerID] = []));
    return {
      blackDeck,
      whiteDeck,
      hands,
      activeBlackCard: null,
      selectedWhiteCards: {},
      bestCombinationPlayerID: null,
    };
  },

  turn: {
    order: TurnOrder.DEFAULT,
    onBegin: RefillHands,
    activePlayers: {
      currentPlayer: STAGE_DRAW_BLACK_CARD,
      others: STAGE_SELECT_WHITE_CARDS,
    },
    stages: {
      [STAGE_DRAW_BLACK_CARD]: {
        moves: {
          DrawBlackCard,
        },
        moveLimit: 1,
        next: "chooseBestCombination",
      },
      [STAGE_SELECT_WHITE_CARDS]: {
        moves: { SelectWhiteCard },
        moveLimit: 2,
      },
      [STAGE_CHOOSE_BEST_COMBINATION]: {
        moves: { ChooseBestCombination },
        moveLimit: 1,
      },
    },
  },
};

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
    whiteDeck,
    hands,
  };
}
