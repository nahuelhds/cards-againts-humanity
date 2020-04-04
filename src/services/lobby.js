import { GameCardsAgainstHumanity } from "../components/CardsAgainstHumanity/game";

export const listGames = (options) => get("/", options);
export const createGame = (numPlayers) => post(`/create`, { numPlayers });
export const joinGame = (gameID, playerID, playerName) =>
  post(`/${gameID}/join`, { playerID, playerName });

export const serverUri =
  process.env.REACT_APP_MULTIPLAYER_SERVER || "http://localhost:8000";

const baseEndpoint = `${serverUri}/games/${GameCardsAgainstHumanity.name}`;

const get = (endpoint, payload) => {
  return fetch(`${baseEndpoint}${endpoint}`, {
    method: "GET",
  }).then((res) => res.json());
};

const post = (endpoint, payload) => {
  return fetch(`${baseEndpoint}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};
