import React from "react";
import {
  STAGE_DRAW_BLACK_CARD,
  STAGE_WHITE_CARDS_SELECTION,
  STAGE_CHOOSING_WINNER,
  STAGE_CHOSEN_WINNER,
} from "../constants";

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
          <StatusWarning>
            ¡Es tu turno! Levantá la carta negra... 👋
          </StatusWarning>
        );
      } else {
        return (
          <StatusSuccess>
            Jugador #{currentPlayer} está levantando la carta. 🙄
          </StatusSuccess>
        );
      }
    }
    case STAGE_WHITE_CARDS_SELECTION:
      if (isMyTurn) {
        return (
          <StatusSuccess>
            Esperando las cartas de los otros jugadores
          </StatusSuccess>
        );
      } else {
        return (
          <StatusWarning>
            Elegí una carta de tu mano para responder
          </StatusWarning>
        );
      }
    case STAGE_CHOOSING_WINNER:
      if (isMyTurn) {
        return <StatusWarning>Elegí la mejor respuesta 😅</StatusWarning>;
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
          ¡Punto para el Jugador #{winnerPlayer}! Iniciando en{" "}
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
  <div className={"md:self-center"}>
    <div
      className={`${bg} ${color} text-center p-2 my-0 m-1 sm:mx-2 md:my-2 md:px-4 text-lg md:text-xl lg:text-1xl xl:text-2xl shadow-lg`}
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
