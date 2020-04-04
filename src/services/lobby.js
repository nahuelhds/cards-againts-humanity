import { GameCardsAgainstHumanity } from "../components/CardsAgainstHumanity/game";

export const listGames = (options) => get("/", options);
export const createGame = (options) => post(`/create`, options);

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
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};
