import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";

function App() {
    const [gameLog, updateGameLog] = useState([]);
    const [activePlayer, setActivePlayer] = useState('X')

    function handleSelectedSquare(rowIndex, colIndex) {
        setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        updateGameLog(prevLog => {
            let currentPlayer = 'X';
            if (prevLog.length > 0 && prevLog[0].player === 'X') {
                currentPlayer = 'O';
            }
            const updatedLog = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevLog];
            return updatedLog;
        });
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
        <GameBoard
            onSelectedSquare={handleSelectedSquare}
            activePlayerSymbol={activePlayer}
            turns={gameLog}/>
    </div>
      <Log turns={gameLog}/>
  </main>
}

export default App
