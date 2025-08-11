import React from "react";

export const GameInfo = ({ currentTurn }) => {
  return (
    <div className="game__menu">
      <p>Current turn: {currentTurn ? "X" : "O"}</p>
    </div>
  );
};
