import Head from "next/head";
import { GameBoard } from "../components/Game/GameBoard";
import { GameInfo } from "../components/Game/GameInfo";
import { GameModal } from "../components/Game/GameModal";
import { useGameState } from "../hooks/useGameState";

export default function Home() {
  const {
    xMove,
    wonCombo,
    boardData,
    modalTitle,
    nextToDisappear,
    updateBoardData,
    reset,
  } = useGameState();

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
          <span>
            On every 4th move, your 1st move disappears! Enjoy{" "}
            <span className="emoji">😉</span>
          </span>
        </p>
        <p className="subtext"></p>

        <GameBoard
          boardData={boardData}
          wonCombo={wonCombo}
          nextToDisappear={nextToDisappear}
          onSquareClick={updateBoardData}
        />

        <GameInfo currentTurn={xMove} />
      </div>

      <GameModal title={modalTitle} onReset={reset} />
    </div>
  );
}
