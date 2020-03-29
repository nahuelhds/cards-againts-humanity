// src/server.js
const Server = require("boardgame.io/server").Server;
const { CardsAgainstHumanity } = require("./CardsAgainstHumanity/game");
const server = Server({ games: [CardsAgainstHumanity] });
server.run(8000);
