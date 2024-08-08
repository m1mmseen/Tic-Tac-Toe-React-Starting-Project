import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./data/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";


const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}



function App() {
    const [gameLog, updateGameLog] = useState([]);
    // const [activePlayer, setActivePlayer] = useState('X')

    const activePlayer = deriveActivePlayer(gameLog);

    let gameBoard = [...initialGameboard.map(array => [...array])];

    for (const turn of gameLog) {
        const {square, player} = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = firstSquareSymbol;
        }
    }

    const hasDraw = gameLog.length === 9 && !winner

    function handleSelectedSquare(rowIndex, colIndex) {
        // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        updateGameLog(prevLog => {

            const currentPlayer = deriveActivePlayer(prevLog);

            const updatedLog = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevLog];
            return updatedLog;
        });
    }

    function handleRestart() {
        updateGameLog([]);
    }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
          <Player
              initialName="Player 1"
              symbol="X"
              isActive={activePlayer === 'X'}/>
          <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlayer === 'O'}/>
      </ol>
        { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
            onSelectedSquare={handleSelectedSquare}
            activePlayerSymbol={activePlayer}
            board={gameBoard}/>
    </div>
      <Log turns={gameLog}/>
  </main>
}

export default App
