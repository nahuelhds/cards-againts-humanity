import React from "react";
import {
  STAGE_DRAW_BLACK_CARD,
  STAGE_SELECT_WHITE_CARDS,
  STAGE_CHOOSE_WINNER,
} from "../../../constants";

export const Status = ({ stage, isMyTurn, currentPlayer }) => {
  switch (stage) {
    case STAGE_DRAW_BLACK_CARD: {
      // If it's me
      if (isMyTurn) {
        return (
          <StatusWarning>
            Levantá una carta negra para comenzar el turno
          </StatusWarning>
        );
      }
      return (
        <StatusBase>
          Acción desconocida para el estado ${STAGE_DRAW_BLACK_CARD}
        </StatusBase>
      );
    }
    case STAGE_SELECT_WHITE_CARDS:
      if (isMyTurn) {
        return (
          <StatusSuccess>
            Esperando que el Jugador #{currentPlayer} levante una carta negra
            para comenzar
          </StatusSuccess>
        );
      }
      return (
        <StatusBase>
          Acción desconocida para el estado ${STAGE_SELECT_WHITE_CARDS}
        </StatusBase>
      );
    case STAGE_CHOOSE_WINNER:
      if (isMyTurn) {
        return <StatusWarning>Elegí la respuesta ganadora</StatusWarning>;
      }
      return (
        <StatusBase>
          Acción desconocida para el estado ${STAGE_CHOOSE_WINNER}
        </StatusBase>
      );
    default:
      return <StatusBase>Acción desconocida</StatusBase>;
  }
};

const StatusBase = ({
  bg = "bg-gray-400",
  color = "text-gray-900",
  children,
}) => (
  <div
    className={`${bg} ${color} rounded py-3 px-6 m-2 -mb-12 text-xl shadow-md`}
  >
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
