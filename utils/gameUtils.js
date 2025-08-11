const WINNING_MOVES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (boardData) => {
  for (const combo of WINNING_MOVES) {
    const [a, b, c] = combo;
    if (
      boardData[a] &&
      boardData[a] === boardData[b] &&
      boardData[a] === boardData[c]
    ) {
      return { won: true, wonCombo: combo };
    }
  }
  return { won: false, wonCombo: [] };
};

export const shouldDisappear = (xMovesQueue, oMovesQueue, xMove) => {
  // First X to disappear
  if (oMovesQueue.length === 3 && xMove) {
    return { shouldRemove: false, nextToDisappear: xMovesQueue[0] };
  }

  // Upcoming Os to disappear
  if (xMovesQueue.length >= 4 && !xMove) {
    return {
      shouldRemove: true,
      idxToBeRemoved: xMovesQueue[0],
      nextToDisappear: oMovesQueue[0],
    };
  }

  // Upcoming Xs to disappear
  if (oMovesQueue.length >= 4 && xMove) {
    return {
      shouldRemove: true,
      idxToBeRemoved: oMovesQueue[0],
      nextToDisappear: xMovesQueue[0],
    };
  }

  return { shouldRemove: false };
};

export const isValidMove = (boardData, idx) => {
  return !boardData[idx];
};
