import { TurnOrder } from "boardgame.io/core";
import { MAX_WHITE_CARDS } from "./constants/phases";

import blackDeck from "./decks/es_AR/black";
import whiteDeck from "./decks/es_AR/white";

const RefillHands = (G, ctx) => {
  const whiteDeck = [...G.whiteDeck];
  const hands = ctx.playOrder.map(playerID => {
    const playerHand = [...G.hands[playerID]];
    while (playerHand.length < MAX_WHITE_CARDS) {
      playerHand.push(whiteDeck.shift());
    }
    return playerHand;
  });

  return {
    whiteDeck,
    hands
  };
};

const SelectWhiteCard = (G, ctx, playerID, selectedWhiteCard) => ({
  hands: {
    ...G.hands,
    [playerID]: [...G.hands[playerID]].filter(
      whiteCard => whiteCard !== selectedWhiteCard
    )
  },
  selectedWhiteCards: {
    ...ctx.selectedWhiteCards,
    [playerID]: [...ctx.selectedWhiteCards[playerID], selectedWhiteCard]
  }
});

const DrawBlackCard = (G, ctx) => {
  const blackDeck = [...G.blackDeck];
  const activeBlackCard = blackDeck.unshift();
  return {
    activeBlackCard,
    blackDeck
  };
};

const ChooseBestCombination = (G, ctx, playerID) => ({
  bestCombinationPlayerID: playerID
});

export const CardsAgainstHumanity = {
  name: "cards-against-humanity",

  setup: ctx => {
    const hands = {};
    ctx.playOrder.forEach(playerID => (hands[playerID] = []));
    return {
      blackDeck,
      whiteDeck,
      hands,
      activeBlackCard: null,
      selectedWhiteCards: {},
      bestCombinationPlayerID: null
    };
  },

  turn: {
    order: TurnOrder.DEFAULT,
    onBegin: RefillHands,
    activePlayers: {
      currentPlayer: "drawBlackCard",
      others: "selectWhiteCards"
    },
    stages: {
      drawBlackCard: {
        moves: {
          DrawBlackCard
        },
        moveLimit: 1,
        next: "chooseBestCombination"
      },
      selectWhiteCards: {
        moves: { SelectWhiteCard },
        moveLimit: 2
      },
      chooseBestCombination: {
        moves: { ChooseBestCombination },
        moveLimit: 1
      }
    }
  }
};
