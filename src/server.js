// src/server.js
const Server = require("boardgame.io/server").Server;
const { GameCardsAgainstHumanity } = require("./components/CardsAgainstHumanity/game");

const PORT = process.env.PORT || 8000;
const server = Server({ games: [GameCardsAgainstHumanity] });

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
