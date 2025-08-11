import { useEffect, useState } from "react";
import { checkWinner, shouldDisappear } from "../utils/gameUtils";

export const useGameState = () => {
  const [xMove, setXMove] = useState(true);
  const [xMovesQueue, setXMovesQueue] = useState([]);
  const [oMovesQueue, setOMovesQueue] = useState([]);
  const [nextToDisappear, setNextToDisappear] = useState(null);
  const [won, setWon] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const {
      shouldRemove,
      idxToBeRemoved,
      nextToDisappear: next,
    } = shouldDisappear(xMovesQueue, oMovesQueue, xMove);

    if (shouldRemove && idxToBeRemoved !== undefined) {
      // Remove the move from the appropriate queue
      if (xMovesQueue.length >= 4 && !xMove) {
        setXMovesQueue(xMovesQueue.slice(1));
      } else if (oMovesQueue.length >= 4 && xMove) {
        setOMovesQueue(oMovesQueue.slice(1));
      }

      // Update board data
      const updatedBoardData = { ...boardData, [idxToBeRemoved]: "" };
      setBoardData(updatedBoardData);

      // Check for winner
      const { won: hasWon, wonCombo: combo } = checkWinner(updatedBoardData);
      if (hasWon) {
        setWon(true);
        setWonCombo(combo);
        setModalTitle(`Player ${!xMove ? "X" : "O"} Won!!!`);
      }
    }

    if (next !== undefined) {
      setNextToDisappear(next);
    }
  }, [xMovesQueue, oMovesQueue, xMove, boardData]);

  const updateBoardData = (idx) => {
    if (!boardData[idx] && !won) {
      const value = xMove ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });

      if (xMove) {
        setXMovesQueue([...xMovesQueue, idx]);
      } else {
        setOMovesQueue([...oMovesQueue, idx]);
      }
      setXMove(!xMove);
    }
  };

  const reset = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setXMove(true);
    setWon(false);
    setWonCombo([]);
    setModalTitle("");
    setXMovesQueue([]);
    setOMovesQueue([]);
    setNextToDisappear(null);
  };

  return {
    xMove,
    xMovesQueue,
    oMovesQueue,
    nextToDisappear,
    won,
    wonCombo,
    boardData,
    modalTitle,
    updateBoardData,
    reset,
  };
};
