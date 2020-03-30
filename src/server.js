// src/server.js
const Server = require("boardgame.io/server").Server;
const { CardsAgainstHumanity } = require("./CardsAgainstHumanity/game");
const { TicTacToe } = require("./TitTacToe/game");
const server = Server({ games: [TicTacToe, CardsAgainstHumanity] });
server.run(8000);
