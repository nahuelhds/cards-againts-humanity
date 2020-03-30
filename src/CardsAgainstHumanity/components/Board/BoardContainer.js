import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import {
  STAGE_CHOOSE_WINNER,
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
} from "../../constants";

import { MyHand } from "./components/MyHand";
import { BlackDeck, WhiteDeck, ActionableBlackDeck } from "./components/Decks";
import { ActiveBlackCard, BlackCard } from "./components/Cards";
import { BlackCardView } from "./components/BlackCardView";
import { Status } from "./components/Status";

const COUNT_DOWN_SECONDS = 5;

export default class BoardContainer extends Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  state = {
    selectedWhiteCard: "",
    selectedWinnerId: "",
    nextTurnInSeconds: COUNT_DOWN_SECONDS,
    countDownIntervalID: false,
  };

  handleDrawBlackCard = () => {
    this.props.moves.DrawABlackCard();
  };

  handleWhiteCardSelection = (selectedWhiteCard) => {
    this.setState({ selectedWhiteCard });
  };

  handleSelectedWhiteCard = () => {
    const { playerID } = this.props;
    const { selectedWhiteCard } = this.state;
    this.props.moves.SelectWhiteCard(playerID, selectedWhiteCard);
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
        blackDeck,
        hands,
        activeBlackCard,
        allWhiteCardsAreSelected,
        selectedWhiteCards,
        winnerPlayerID,
      },
    } = this.props;

    const { selectedWhiteCard, nextTurnInSeconds } = this.state;
    const stage = activePlayers[playerID];
    const isMyTurn = currentPlayer === playerID;

    return (
      <div className="bg-gray-400 h-screen">
        <div className="flex justify-center">
          <Status
            stage={stage}
            isMyTurn={isMyTurn}
            currentPlayer={currentPlayer}
          />
        </div>
        <div className="flex">
          <BlackCardView
            stage={stage}
            isMyTurn={isMyTurn}
            activeBlackCard={activeBlackCard}
            blackDeck={blackDeck}
            handleDrawBlackCard={this.handleDrawBlackCard}
          />
        </div>
        <MyHand
          stage={stage}
          cards={hands[playerID]}
          isMyTurn={isMyTurn}
          onSelect={this.handleWhiteCardSelection}
          onSubmit={this.handleSelectedWhiteCard}
          selectedCard={selectedWhiteCard}
        ></MyHand>
      </div>
    );
  }
}
