// TODO: I+D react-hooks-async.
//  See: https://github.com/dai-shi/react-hooks-async
import { GameCardsAgainstHumanity } from "../components/CardsAgainstHumanity/game";

export const listGames = () => get("/");
export const getGame = (gameID) => get(`/${gameID}`);
export const createGame = (numPlayers) => post(`/create`, { numPlayers });
export const joinGame = (gameID, playerID, playerName) =>
  post(`/${gameID}/join`, { playerID, playerName });

const { protocol, hostname } = document.location;
export const serverUri =
  process.env.REACT_APP_MULTIPLAYER_SERVER || `${protocol}//${hostname}:8000`;

const baseEndpoint = `${serverUri}/games/${GameCardsAgainstHumanity.name}`;

const get = (endpoint, payload) => {
  return fetch(`${baseEndpoint}${endpoint}`, {
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
};

const post = (endpoint, payload) => {
  return fetch(`${baseEndpoint}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
};
