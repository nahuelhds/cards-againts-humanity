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

  setup: ctx => ({ deck: 6, hand: Array(ctx.numPlayers).fill(0) }),

  moves: {
    DrawCard,
    PlayCard
  },
  turn: { moveLimit: 1 }
};
