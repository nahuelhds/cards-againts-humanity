/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import PropTypes from "prop-types";
import { DRAW_WHITE_CARDS } from "./constants/phases";
import "./board.css";

const ReadBlackCardActions = ({
  isMine,
  isOthersTurn,
  isActive,
  onDrawCard
}) => (
  <React.Fragment>
    {isMine && (
      <button disabled={!isActive || !isOthersTurn} onClick={onDrawCard}>
        Draw white cards
      </button>
    )}
    {!isMine && isOthersTurn && <div>WAITING FOR THE PLAYER TO MOVE</div>}
    {!isMine && !isOthersTurn && <div>WAITING FOR HER TURN</div>}
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
      ctx: { currentPlayer, phase, playOrder },
      G: { whiteDeck, hands }
    } = this.props;

    return (
      <div>
        <div>Deck: {whiteDeck.length}</div>
        {playOrder.map(player => {
          const isOthersTurn = player === currentPlayer;
          const isMine = player === playerID;
          return (
            <div key={`player-${player}`}>
              <div>
                Player {player}
                {isMine && (
                  <ol>
                    {hands[player].map((card, index) => (
                      <li key={`card-${index}`}>{card}</li>
                    ))}
                  </ol>
                )}
              </div>
              {phase === DRAW_WHITE_CARDS && (
                <ReadBlackCardActions
                  isMine={isMine}
                  isOthersTurn={isOthersTurn}
                  isActive={isActive}
                  onDrawCard={this.handleDrawCard}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
