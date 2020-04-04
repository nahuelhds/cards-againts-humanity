import React, { Component } from "react";
import PropTypes from "prop-types";

import { MyHand } from "./MyHand";
import { BlackCardView } from "./BlackCardView";
import { WhiteCards } from "./WhiteCards";
import { Status } from "./Status";
import {
  COUNT_DOWN_SECONDS,
  STAGE_CHOSEN_WINNER,
  STAGE_DRAW_BLACK_CARD,
} from "../constants";
import { PositionsTable } from "./PositionsTable";

import "./BoardContainer.css";

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
    nextTurnInSeconds: COUNT_DOWN_SECONDS,
  };

  componentDidUpdate(prevProps) {
    const { ctx, G, playerID } = this.props;
    const { activePlayers } = ctx;
    const { chosenWinnerID } = G;

    const prevStage = prevProps.ctx.activePlayers[playerID];
    const stage = activePlayers[playerID];
    if (
      prevProps.G.chosenWinnerID !== chosenWinnerID &&
      prevProps.G.chosenWinnerID === null
    ) {
      this.startCountDown();
    }
    if (prevStage === STAGE_CHOSEN_WINNER && stage === STAGE_DRAW_BLACK_CARD) {
      this.setState({
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

  handleSelectedWhiteCard = (chosenWhiteCard) => {
    const { playerID } = this.props;
    this.props.moves.SelectWhiteCard(playerID, chosenWhiteCard);
  };

  handleSelectedWinner = (chosenWinnerID) => {
    this.props.moves.SelectWinner(chosenWinnerID);
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
      ctx: { currentPlayer, activePlayers, playOrder },
      G: {
        hands,
        activeBlackCard,
        selectedWhiteCardsOrder,
        selectedWhiteCards,
        chosenWhiteCard,
        allWhiteCardsAreSelected,
        chosenWinnerID,
        wonBlackCards,
      },
    } = this.props;

    const { nextTurnInSeconds } = this.state;
    const stage = activePlayers[playerID];
    const isMyTurn = currentPlayer === playerID;

    return (
      <div className="pb-48 md:pb-64 text-sm sm:text-md md:text-lg lg:text-xl">
        <div className={"flex flex-col"}>
          <PositionsTable wonBlackCards={wonBlackCards} playerIDs={playOrder} />
          <Status
            stage={stage}
            isMyTurn={isMyTurn}
            currentPlayer={currentPlayer}
            winnerPlayer={chosenWinnerID}
            nextTurnInSeconds={nextTurnInSeconds}
          />
        </div>
        <div className="flex items-start flex-wrap">
          <BlackCardView
            stage={stage}
            isMyTurn={isMyTurn}
            activeBlackCard={activeBlackCard}
            handleDrawBlackCard={this.handleDrawBlackCard}
          />
          <WhiteCards
            stage={stage}
            currentPlayer={currentPlayer}
            isMyTurn={isMyTurn}
            playerID={playerID}
            cardsOrder={selectedWhiteCardsOrder}
            cards={selectedWhiteCards}
            isSelectable={allWhiteCardsAreSelected}
            chosenWinnerID={chosenWinnerID}
            handleSelectedWinner={this.handleSelectedWinner}
          />
        </div>
        <MyHand
          cards={hands[playerID]}
          isMyTurn={isMyTurn}
          selected={chosenWhiteCard[playerID] !== null}
          onSelect={this.handleSelectedWhiteCard}
        />
      </div>
    );
  }
}
