import Head from "next/head";
import { useEffect, useState } from "react";

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

export default function Home() {
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
    let idxToBeRemoved;

    // first X to disappear
    if (oMovesQueue.length === 3 && xMove) setNextToDisappear(xMovesQueue[0]);

    // upcoming Os to disappear
    if (xMovesQueue.length >= 4 && !xMove) {
      idxToBeRemoved = xMovesQueue[0];
      setXMovesQueue(xMovesQueue.slice(1));
      setNextToDisappear(oMovesQueue[0]);
    }

    // upcoming Xs to disappear
    if (oMovesQueue.length >= 4 && xMove) {
      idxToBeRemoved = oMovesQueue[0];
      setOMovesQueue(oMovesQueue.slice(1));
      setNextToDisappear(xMovesQueue[0]);
    }

    const updatedBoardData = { ...boardData, [idxToBeRemoved]: "" };
    setBoardData(updatedBoardData);

    checkWinner(updatedBoardData);
  }, [xMovesQueue, oMovesQueue]);

  const updateBoardData = (idx) => {
    if (!boardData[idx] && !won) {
      let value = xMove === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });

      if (xMove) {
        setXMovesQueue([...xMovesQueue, idx]);
      } else {
        setOMovesQueue([...oMovesQueue, idx]);
      }
      setXMove(!xMove);
    }
  };

  const checkWinner = (boardData) => {
    WINNING_MOVES.map((bd) => {
      const [a, b, c] = bd;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWon(true);
        setWonCombo([a, b, c]);
        setModalTitle(`Player ${!xMove ? "X" : "O"} Won!!!`);

        return;
      }
    });
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

  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <p className="subtext">
          <span>
            This is not your normal Tic-Tac-Toe, this one comes with a twist.
          </span>
          <span>On your 4th move, your 1st move disappears! Enjoy ;)</span>
        </p>
        <p className="subtext"></p>
        <div className="game__board">
          {[...Array(9)].map((v, idx) => {
            return (
              <div
                onClick={() => {
                  updateBoardData(idx);
                }}
                key={idx}
                className={`square ${
                  wonCombo.includes(idx) ? "highlight" : ""
                } ${idx === nextToDisappear ? "disappearing-next" : ""}`}
              >
                {boardData[idx]}
              </div>
            );
          })}
        </div>
        <div className="game__menu">
          <p>Current turn: {xMove === true ? "X" : "O"}</p>
        </div>
      </div>

      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="modal__title">{modalTitle}</div>
        <button onClick={reset}>New Game</button>
      </div>
    </div>
  );
}
