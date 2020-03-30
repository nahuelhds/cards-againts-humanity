export const IS_MY_TURN = "IS_MY_TURN";
export const IS_ANOTHER_PLAYER_TURN = "IS_ANOTHER_PLAYER_TURN";

export const calculateTurnType = (currentPlayer, playerId) => {
  if (currentPlayer === playerId) {
    return IS_MY_TURN;
  }
  return IS_ANOTHER_PLAYER_TURN;
};

export default calculateTurnType;
