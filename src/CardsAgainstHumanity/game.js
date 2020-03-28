import { TurnOrder } from "boardgame.io/core";
import { DRAW_WHITE_CARDS } from "./constants/phases";

import blackDeck from "./decks/es_AR/black";
import whiteDeck from "./decks/es_AR/white";

const MAX_WHITE_CARDS = 10;

function FillMyHand(G, ctx) {
  const { currentPlayer } = ctx;

  const whiteDeck = [...G.whiteDeck];
  const playerHand = [...G.hands[currentPlayer]];

  while (playerHand.length < MAX_WHITE_CARDS) {
    playerHand.push(whiteDeck.shift());
  }

  return {
    whiteDeck,
    hands: {
      ...G.hands,
      [currentPlayer]: playerHand
    }
  };
}

export const CardsAgainstHumanity = {
  name: "cards-against-humanity",

  setup: ctx => {
    const hands = {};
    ctx.playOrder.map(playerID => (hands[playerID] = []));
    return {
      blackDeck,
      whiteDeck,
      hands
    };
  },

  phases: {
    [DRAW_WHITE_CARDS]: {
      start: true,
      next: "readBlackCard",
      moves: {
        FillMyHand
      },
      turn: {
        moveLimit: 1,
        order: TurnOrder.ONCE
      }
    },

    readBlackCard: {},

    receiveAnswers: {},

    readAnswers: {},

    chooseTurnWinner: {}
  }
};
