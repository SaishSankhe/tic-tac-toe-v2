import React from "react";

export const GameSquare = ({
  value,
  index,
  isHighlighted,
  isDisappearingNext,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(index)}
      className={`square ${isHighlighted ? "highlight" : ""} ${
        isDisappearingNext ? "disappearing-next" : ""
      }`}
    >
      {value}
    </div>
  );
};
