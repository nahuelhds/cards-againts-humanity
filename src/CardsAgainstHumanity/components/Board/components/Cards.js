import React, { Fragment } from "react";
import styles from "./Cards.module.css";

export const WhiteCard = ({ children, ...props }) => (
  <Card {...props}>{children}</Card>
);

export const BlackCard = ({ active, children, ...props }) => (
  <Fragment>
    {active && (
      <Card bg={`bg-black`} color={`text-white`} {...props}>
        {children}
      </Card>
    )}
    {!active && (
      <Card bg={`bg-gray-500`} color={`text-gray-1000`} {...props}>
        Esperando por la nueva carta
      </Card>
    )}
  </Fragment>
);

export const ActiveBlackCard = ({ card, ...props }) => {
  return (
    <BlackCard active={!!card} {...props} w="w-48" h="h-64">
      {card}
    </BlackCard>
  );
};

const Card = ({
  bg = "bg-white",
  color = "text-black",
  w = "w-24",
  h = "h-48",
  transform = "",
  className,
  children,
}) => (
  <div
    className={`${styles.whiteCard} ${bg} ${w} ${h} ${transform} ${className} p-4 rounded shadow-lg `}
  >
    <div className={`${color} font-bold text-lg`}>{children}</div>
  </div>
);
