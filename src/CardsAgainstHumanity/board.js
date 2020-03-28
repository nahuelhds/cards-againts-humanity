/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import PropTypes from "prop-types";
import "./board.css";

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
      ctx: { playOrder, currentPlayer },
      G: { whiteDeck, hands }
    } = this.props;

    return (
      <div>
        <div>Deck: {whiteDeck.length}</div>
        {playOrder.map(player => {
          const isHerTurn = player === currentPlayer;
          const isMine = player === playerID;
          return (
            <div key={`player-${player}`}>
              <div>
                Hand:
                {isMine && (
                  <ol>
                    {hands[player].map((card, index) => (
                      <li key={`card-${index}`}>{card}</li>
                    ))}
                  </ol>
                )}
              </div>
              {isMine && (
                <button
                  disabled={!isActive || !isHerTurn}
                  onClick={this.handleDrawCard}
                >
                  Draw white cards
                </button>
              )}
              {!isMine && isHerTurn && (
                <div>WAITING FOR THE PLAYER TO MOVE</div>
              )}
              {!isMine && !isHerTurn && <div>WAITING FOR HER TURN</div>}
            </div>
          );
        })}
      </div>
    );
  }
}
