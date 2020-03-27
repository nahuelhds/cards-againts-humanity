// src/server.js
const Server = require("boardgame.io/server").Server;
const { TicTacToe } = require("./game");
const server = Server({ games: [TicTacToe] });
server.run(8000);
