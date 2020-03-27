import blackDeck from "./decks/es_AR/black";
import whiteDeck from "./decks/es_AR/white";

function DrawCard(G, ctx) {
  G.deck--;
  G.hand[ctx.currentPlayer]++;
}

function PlayCard(G, ctx) {
  G.deck++;
  G.hand[ctx.currentPlayer]--;
}

export const CardsAgainstHumanity = {
  name: "cards-against-humanity",

  setup: ctx => ({
    blackDeck,
    whiteDeck,
    hand: ctx.playOrder.map(() => 0)
  }),

  phases: {
    drawWhiteCards: {},

    readBlackCard: {},

    receiveAnswers: {},

    readAnswers: {},

    chooseTurnWinner: {}
  },

  moves: {
    DrawCard,
    PlayCard
  },
  turn: { moveLimit: 1 }
};
