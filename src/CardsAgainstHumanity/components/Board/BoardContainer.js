import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import {
  STAGE_CHOOSE_WINNER,
  STAGE_DRAW_BLACK_CARD,
  STAGE_SELECT_WHITE_CARDS,
} from "../../constants";

import { MyHand } from "./components/MyHand";
import { BlackDeck, WhiteDeck } from "./components/Deck";

const COUNT_DOWN_SECONDS = 5;

export default class BoardContainer extends Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerId: PropTypes.string,
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
    const { playerId } = this.props;
    const { selectedCard } = this.state;
    this.props.moves.SelectWhiteCard(playerId, selectedCard);
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
      playerId,
      ctx: { currentPlayer },
    } = this.props;
    if (currentPlayer === playerId) {
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
      playerId,
      ctx: { currentPlayer, playOrder, activePlayers },
      G: {
        whiteDeck,
        blackDeck,
        hands,
        activeBlackCard,
        allWhiteCardsAreSelected,
        selectedWhiteCards,
        winnerPlayerID,
      },
    } = this.props;

    const { nextTurnInSeconds } = this.state;
    const stage = activePlayers[playerId];

    return (
      <Fragment>
        <div className="bg-gray-200 h-screen">
          <div className="flex">
            <BlackDeck deck={blackDeck}></BlackDeck>
            <WhiteDeck deck={whiteDeck}></WhiteDeck>
          </div>
        </div>
        <MyHand whiteCards={hands[playerId]}></MyHand>
      </Fragment>
    );
  }
}
