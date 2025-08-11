import React from "react";
import { GameSquare } from "./GameSquare";

export const GameBoard = ({
  boardData,
  wonCombo,
  nextToDisappear,
  onSquareClick,
}) => {
  return (
    <div className="game__board">
      {[...Array(9)].map((_, idx) => (
        <GameSquare
          key={idx}
          value={boardData[idx]}
          index={idx}
          isHighlighted={wonCombo.includes(idx)}
          isDisappearingNext={idx === nextToDisappear}
          onClick={onSquareClick}
        />
      ))}
    </div>
  );
};
