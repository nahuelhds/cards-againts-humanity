import React, { Component } from "react";
import PropTypes from "prop-types";

import { MyHand } from "./components/MyHand";
import { BlackCardView } from "./components/BlackCardView";
import { WhiteCards } from "./components/WhiteCards";
import { Status } from "./components/Status";
import {
  COUNT_DOWN_SECONDS,
  STAGE_CHOSEN_WINNER,
  STAGE_DRAW_BLACK_CARD,
} from "../../constants";

export default class BoardContainer extends Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  countDownIntervalID = false;

  state = {
    selectedWhiteCard: "",
    selectedWinnerID: "",
    nextTurnInSeconds: COUNT_DOWN_SECONDS,
  };

  componentDidUpdate(prevProps) {
    const { ctx, G, playerID } = this.props;
    const { activePlayers } = ctx;
    const { winnerPlayerID } = G;

    const prevStage = prevProps.ctx.activePlayers[playerID];
    const stage = activePlayers[playerID];
    if (
      prevProps.G.winnerPlayerID !== winnerPlayerID &&
      prevProps.G.winnerPlayerID === null
    ) {
      this.startCountDown();
    }
    console.log(prevStage, stage);
    if (prevStage === STAGE_CHOSEN_WINNER && stage === STAGE_DRAW_BLACK_CARD) {
      console.log("CHANGING");
      this.setState({
        selectedWhiteCard: "",
        selectedWinnerID: "",
        nextTurnInSeconds: COUNT_DOWN_SECONDS,
      });
    }
  }

  startCountDown = () => {
    setTimeout(() => {
      this.handleEndThisTurn();
    }, COUNT_DOWN_SECONDS * 1000);
    this.countDownIntervalID = setInterval(() => {
      this.setState({ nextTurnInSeconds: this.state.nextTurnInSeconds - 1 });
    }, 1000);
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

  handleWinnerSelection = (selectedWinnerID) => {
    this.setState({ selectedWinnerID });
  };

  handleSelectedWinner = () => {
    const { selectedWinnerID } = this.state;
    this.props.moves.ChooseWinner(selectedWinnerID);
  };

  handleEndThisTurn = () => {
    const {
      playerID,
      ctx: { currentPlayer },
    } = this.props;
    if (currentPlayer === playerID) {
      this.props.moves.EndThisTurn();
    }
    setTimeout(() => {
      clearInterval(this.countDownIntervalID);
      this.setState({
        nextTurnInSeconds: COUNT_DOWN_SECONDS,
      });
    }, 1000);
  };

  render() {
    const {
      playerID,
      ctx: { currentPlayer, activePlayers },
      G: {
        blackDeck,
        hands,
        activeBlackCard,
        selectedWhiteCards,
        allWhiteCardsAreSelected,
        winnerPlayerID,
      },
    } = this.props;

    const {
      selectedWhiteCard,
      selectedWinnerID,
      nextTurnInSeconds,
    } = this.state;
    const stage = activePlayers[playerID];
    const isMyTurn = currentPlayer === playerID;
    const isSelectedWhiteCardSent =
      selectedWhiteCards[playerID] && selectedWhiteCards[playerID] !== "";

    return (
      <div className="bg-gray-400 h-screen">
        <div className="flex justify-center">
          <Status
            stage={stage}
            isMyTurn={isMyTurn}
            currentPlayer={currentPlayer}
            winnerPlayer={winnerPlayerID}
            nextTurnInSeconds={nextTurnInSeconds}
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
          <WhiteCards
            stage={stage}
            currentPlayer={currentPlayer}
            isMyTurn={isMyTurn}
            playerID={playerID}
            cards={selectedWhiteCards}
            isSelectable={allWhiteCardsAreSelected}
            winnerPlayerID={winnerPlayerID}
            selectedWinnerID={selectedWinnerID}
            handleWinnerSelection={this.handleWinnerSelection}
            handleSelectedWinner={this.handleSelectedWinner}
          />
        </div>
        <MyHand
          stage={stage}
          cards={hands[playerID]}
          isMyTurn={isMyTurn}
          onSelect={this.handleWhiteCardSelection}
          onSubmit={this.handleSelectedWhiteCard}
          selectedCard={selectedWhiteCard}
          isSelectedCardSent={isSelectedWhiteCardSent}
        ></MyHand>
      </div>
    );
  }
}
