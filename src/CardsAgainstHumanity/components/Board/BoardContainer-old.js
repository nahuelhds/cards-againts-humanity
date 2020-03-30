import React from "react";
import PropTypes from "prop-types";

import {
  STAGE_CHOOSE_WINNER,
  STAGE_DRAW_BLACK_CARD,
  STAGE_SELECT_WHITE_CARDS,
} from "../../constants";

const COUNT_DOWN_SECONDS = 5;

export default class BoardContainer extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  state = {
    selectedCard: "",
    selectedWinnerId: "",
    nextTurnInSeconds: COUNT_DOWN_SECONDS,
    countDownIntervalID: false,
  };

  handleDrawBlackCard = () => {
    this.props.moves.DrawABlackCard();
  };

  handleWhiteCardSelection = (event) => {
    this.setState({ selectedCard: event.target.value });
  };

  handleSelectedWhiteCard = () => {
    const { playerID } = this.props;
    const { selectedCard } = this.state;
    this.props.moves.SelectWhiteCard(playerID, selectedCard);
  };

  handleWinnerSelection = (event) => {
    this.setState({ selectedWinnerId: event.target.value });
  };

  handleSelectedWinner = () => {
    const { selectedWinnerId } = this.state;
    this.props.moves.ChooseWinner(selectedWinnerId);
  };

  componentDidUpdate(prevProps) {
    const { winnerPlayerID } = this.props.G;
    if (
      prevProps.G.winnerPlayerID !== winnerPlayerID &&
      prevProps.G.winnerPlayerID === null
    ) {
      this.startCountDown();
    }
  }

  startCountDown = () => {
    setTimeout(() => {
      this.handleEndThisTurn();
    }, COUNT_DOWN_SECONDS * 1000);
    const countDownIntervalID = setInterval(() => {
      this.setState({ nextTurnInSeconds: this.state.nextTurnInSeconds - 1 });
    }, 1000);
    this.setState({ countDownIntervalID });
  };

  handleEndThisTurn = () => {
    const {
      playerID,
      ctx: { currentPlayer },
    } = this.props;
    if (currentPlayer === playerID) {
      this.props.moves.EndThisTurn();
    }
    clearInterval(this.state.countDownIntervalID);
    this.setState({
      nextTurnInSeconds: COUNT_DOWN_SECONDS,
    });
  };

  render() {
    const {
      isActive,
      playerID,
      ctx: { currentPlayer, playOrder, activePlayers },
      G: {
        whiteDeck,
        hands,
        activeBlackCard,
        allWhiteCardsAreSelected,
        selectedWhiteCards,
        winnerPlayerID,
      },
    } = this.props;

    const { nextTurnInSeconds } = this.state;
    const stage = activePlayers[playerID];

    return (
      <table className={"BoardTable"}>
        <thead>
          <tr>
            <th colSpan={3}>Cartas blancas restantes: {whiteDeck.length}</th>
          </tr>
          <tr>
            <th colSpan={3}>
              Cartas negra en juego:
              <br />
              {activeBlackCard
                ? activeBlackCard.replace("{whiteCard}", "_________")
                : `esperando por jugador #${currentPlayer}`}
            </th>
          </tr>
          {winnerPlayerID && (
            <React.Fragment>
              <tr>
                <th colSpan={3}>Ganó el jugador #{winnerPlayerID}</th>
              </tr>
              <tr>
                <th colSpan={3}>
                  Iniciando próximo turno en {nextTurnInSeconds}
                </th>
              </tr>
            </React.Fragment>
          )}
        </thead>
        <tbody>
          {playOrder.map((player) => {
            const isMe = player === playerID;
            const isOthersTurn = player === currentPlayer;
            return (
              <tr key={`player-${player}`}>
                <td>
                  <strong>Jugador #{player}</strong>
                  {!isMe && isOthersTurn && (
                    <div>Esperando que levante la carta negra</div>
                  )}
                  {!isMe && !isOthersTurn && <div>Esperando para jugar</div>}
                  {stage === STAGE_CHOOSE_WINNER &&
                    isMe &&
                    !allWhiteCardsAreSelected && (
                      <p>Waiting for players to selected their white cards</p>
                    )}
                  {stage === STAGE_CHOOSE_WINNER &&
                    isMe &&
                    allWhiteCardsAreSelected && (
                      <React.Fragment>
                        <ul>
                          {Object.values(selectedWhiteCards).map(
                            (whiteCard, index) => (
                              <li key={`whiteCardCombination-${index}`}>
                                {activeBlackCard.indexOf("{whiteCard}") > -1
                                  ? activeBlackCard.replace(
                                      "{whiteCard}",
                                      whiteCard.toUpperCase()
                                    )
                                  : whiteCard.toUpperCase()}
                              </li>
                            )
                          )}
                        </ul>
                        <div>
                          <select
                            onChange={this.handleWinnerSelection}
                            value={this.state.selectedWinner}
                          >
                            <option value={""}>
                              Elige la mejor combinacion
                            </option>
                            {Object.keys(selectedWhiteCards).map((playerID) => (
                              <option
                                key={`combination-${playerID}`}
                                value={playerID}
                              >
                                {activeBlackCard.indexOf("{whiteCard}") > -1
                                  ? activeBlackCard.replace(
                                      "{whiteCard}",
                                      selectedWhiteCards[playerID].toUpperCase()
                                    )
                                  : `${activeBlackCard} ${selectedWhiteCards[
                                      playerID
                                    ].toUpperCase()}`}
                              </option>
                            ))}
                          </select>
                          <button onClick={this.handleSelectedWinner}>
                            Elegir ganador
                          </button>
                        </div>
                      </React.Fragment>
                    )}
                  {stage === STAGE_DRAW_BLACK_CARD && isMe && (
                    <button
                      disabled={!isActive || !isOthersTurn}
                      onClick={this.handleDrawBlackCard}
                    >
                      Levantar carta negra
                    </button>
                  )}
                  {stage === STAGE_SELECT_WHITE_CARDS && (
                    <div>
                      {isMe && hands[player].length && (
                        <React.Fragment>
                          <p>Cartas levantadas:</p>
                          <ol>
                            {hands[player].map((card, index) => (
                              <li key={`card-${index}`}>{card}</li>
                            ))}
                          </ol>
                          {activeBlackCard && (
                            <div>
                              <select
                                onChange={this.handleWhiteCardSelection}
                                value={this.state.selectedCard}
                              >
                                <option value={""}>
                                  Elige una carta blanca
                                </option>
                                {hands[player].map((card, index) => (
                                  <option key={`card-${index}`} value={card}>
                                    {card}
                                  </option>
                                ))}
                              </select>
                              <button onClick={this.handleSelectedWhiteCard}>
                                Elegir esta carta
                              </button>
                            </div>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
