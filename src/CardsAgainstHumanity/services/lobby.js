import { GameCardsAgainstHumanity } from "../game";

export const createGame = (options) => post(`/create`, options);

export const serverUri =
  process.env.REACT_APP_MULTIPLAYER_SERVER || "http://localhost:8000";

const baseEndpoint = `${serverUri}/games/${GameCardsAgainstHumanity.name}`;
const post = (endpoint, payload) => {
  return fetch(`${baseEndpoint}${endpoint}`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};
