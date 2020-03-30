import React, { Component } from "react";
import PropTypes from "prop-types";

import { MyHand } from "./components/MyHand";
import { SelectedWhiteCard } from "./components/Cards";
import { BlackCardView } from "./components/BlackCardView";
import { Status } from "./components/Status";
import {
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
  COUNT_DOWN_SECONDS,
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

  state = {
    selectedWhiteCard: "",
    selectedWinnerID: "",
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

  handleWinnerSelection = (selectedWinnerID) => {
    this.setState({ selectedWinnerID });
  };

  handleSelectedWinner = () => {
    const { selectedWinnerID } = this.state;
    this.props.moves.ChooseWinner(selectedWinnerID);
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
      playerID,
      ctx: { currentPlayer, activePlayers },
      G: {
        blackDeck,
        hands,
        activeBlackCard,
        selectedWhiteCards,
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
          {Object.keys(selectedWhiteCards).map((cardPlayerID, index) => (
            <SelectedWhiteCard
              key={`white-card-${index}`}
              isMyTurn={isMyTurn}
              show={
                isMyTurn ||
                [STAGE_CHOOSING_WINNER, STAGE_CHOSEN_WINNER].indexOf(stage) >
                  -1 ||
                selectedWhiteCards[playerID] ===
                  selectedWhiteCards[cardPlayerID]
              }
              text={selectedWhiteCards[cardPlayerID]}
              selected={selectedWinnerID === cardPlayerID}
              winner={winnerPlayerID === cardPlayerID}
              onSelect={() => this.handleWinnerSelection(cardPlayerID)}
              onSubmit={this.handleSelectedWinner}
            />
          ))}
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
