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
    playekrID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool
  };

  handleDrawCard = () => {
    this.props.moves.FillMyHand();
  };

  render() {
    const {
      isActive,
      ctx: { playOrder, currentPlayer },
      G: { whiteDeck, hands }
    } = this.props;

    return (
      <div>
        <div>Deck: {whiteDeck.length}</div>
        {playOrder.map(player => {
          const isMyTurn = player === currentPlayer;
          return (
            <div key={`player-${player}`}>
              <div>
                Hand:
                <ol>
                  {hands[player].map((card, index) => (
                    <li key={`card-${index}`}>{card}</li>
                  ))}
                </ol>
              </div>
              <button
                disabled={!isActive || !isMyTurn}
                onClick={this.handleDrawCard}
              >
                Draw white cards
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
