import React from "react";
import {
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
} from "../../../constants";

export const Status = ({ stage, isMyTurn, currentPlayer, winnerPlayer }) => {
  switch (stage) {
    case STAGE_DRAW_BLACK_CARD: {
      if (isMyTurn) {
        return (
          <StatusWarning>
            Levantá una carta negra para comenzar el turno
          </StatusWarning>
        );
      } else {
        return (
          <StatusInfo>
            Esperando que el Jugador #{currentPlayer} levante una carta negra
            para comenzar
          </StatusInfo>
        );
      }
    }
    case STAGE_WHITE_CARDS_SELECTION:
      if (isMyTurn) {
        return (
          <StatusInfo>
            Esperando las respuestas de los demás jugadores
          </StatusInfo>
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
          <StatusInfo>Jugador #{currentPlayer} esta eligiendo...</StatusInfo>
        );
      }
    case STAGE_CHOSEN_WINNER:
      return (
        <StatusSuccess>
          El ganaro de esta ronda es el jugador #{winnerPlayer}
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
  <div className={`${bg} ${color} rounded py-3 px-6 m-2 text-xl shadow-md`}>
    {children}
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
