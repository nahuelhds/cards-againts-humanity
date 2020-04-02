import React from "react";
import {
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
} from "../../../constants";
import { PositionsTable } from "./PositionsTable";

export const Status = ({
  stage,
  isMyTurn,
  currentPlayer,
  winnerPlayer,
  nextTurnInSeconds,
}) => {
  switch (stage) {
    case STAGE_DRAW_BLACK_CARD: {
      if (isMyTurn) {
        return (
          <StatusWarning>¡Es tu turno! Levantá la carta negra...</StatusWarning>
        );
      } else {
        return (
          <StatusSuccess>
            Esperando que el Jugador #{currentPlayer} levante una carta negra
            para comenzar
          </StatusSuccess>
        );
      }
    }
    case STAGE_WHITE_CARDS_SELECTION:
      if (isMyTurn) {
        return (
          <StatusSuccess>
            Esperando las respuestas de los demás jugadores
          </StatusSuccess>
        );
      } else {
        return (
          <StatusWarning>
            Elegí la que creas que es la mejor respuesta
          </StatusWarning>
        );
      }
    case STAGE_CHOOSING_WINNER:
      if (isMyTurn) {
        return <StatusWarning>Elegí la respuesta ganadora</StatusWarning>;
      } else {
        return (
          <StatusSuccess>
            Jugador #{currentPlayer} esta eligiendo...
          </StatusSuccess>
        );
      }
    case STAGE_CHOSEN_WINNER:
      return (
        <StatusSuccess>
          El ganador es el jugador #{winnerPlayer}. El próximo turno inicia en{" "}
          {nextTurnInSeconds}s...
        </StatusSuccess>
      );
    default:
      return <StatusBase>Acción desconocida</StatusBase>;
  }
};

const StatusBase = ({
  bg = "bg-gray-500",
  color = "text-gray-800",
  children,
}) => (
  <div className="justify-center text-center sm:sticky sm:top-0 sm:z-10">
    <div
      className={`${bg} ${color} rounded py-2 px-4 lg:py-3 lg:px-6 m-2 shadow-md`}
    >
      {children}
    </div>
  </div>
);

export const StatusDanger = ({ children }) => (
  <StatusBase bg={"bg-red-400"} color={"text-red-900"}>
    {children}
  </StatusBase>
);

export const StatusWarning = ({ children }) => (
  <StatusBase bg={"bg-yellow-400"} color={"text-yellow-900"}>
    {children}
  </StatusBase>
);

export const StatusInfo = ({ children }) => (
  <StatusBase bg={"bg-blue-400"} color={"text-blue-900"}>
    {children}
  </StatusBase>
);

export const StatusSuccess = ({ children }) => (
  <StatusBase bg={"bg-green-400"} color={"text-green-900"}>
    {children}
  </StatusBase>
);
