import React from "react";
import PropTypes from "prop-types";
import { PHASE_DRAW_WHITE_CARDS, MAX_WHITE_CARDS } from "./constants/phases";
import "./board.scss";

const ReadBlackCardActions = ({
  isMine,
  isOthersTurn,
  isActive,
  hasAllCards,
  onDrawCard
}) => (
  <React.Fragment>
    {isMine && (
      <button disabled={!isActive || !isOthersTurn} onClick={onDrawCard}>
        Levantar cartas blancas
      </button>
    )}
    {!isMine && isOthersTurn && <div>Esperando que levante sus cartas</div>}
    {!isMine && !isOthersTurn && !hasAllCards && <div>Esperando su turno</div>}
    {!isMine && !isOthersTurn && hasAllCards && (
      <div>Ya levantó sus cartas</div>
    )}
  </React.Fragment>
);

export class CardsAgainstHumanityBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool
  };

  handleDrawCard = () => {
    this.props.moves.FillMyHand();
  };

  render() {
    const {
      isActive,
      playerID,
      ctx: { currentPlayer, stage, playOrder },
      G: { whiteDeck, hands }
    } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th colSpan={3}>
              Cantidad de cartas blancas disponibles: {whiteDeck.length}
            </th>
          </tr>
        </thead>
        <tbody>
          {playOrder.map(player => {
            const isOthersTurn = player === currentPlayer;
            const isMine = player === playerID;
            const hasAllCards = hands[player].length === MAX_WHITE_CARDS;
            return (
              <tr key={`player-${player}`}>
                <td>
                  <div>
                    <strong>Jugador #{player}</strong>
                    {isMine && hands[player].length && (
                      <React.Fragment>
                        <p>Cartas levantadas:</p>
                        <ol>
                          {hands[player].map((card, index) => (
                            <li key={`card-${index}`}>{card}</li>
                          ))}
                        </ol>
                      </React.Fragment>
                    )}
                  </div>
                  {stage === PHASE_DRAW_WHITE_CARDS && (
                    <ReadBlackCardActions
                      isMine={isMine}
                      isOthersTurn={isOthersTurn}
                      isActive={isActive}
                      hasAllCards={hasAllCards}
                      onDrawCard={this.handleDrawCard}
                    />
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
