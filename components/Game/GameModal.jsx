import React from "react";

export const GameModal = ({ title, onReset }) => {
  return (
    <div className={`modal ${title ? "show" : ""}`}>
      <div className="modal__title">{title}</div>
      <button onClick={onReset}>New Game</button>
    </div>
  );
};
