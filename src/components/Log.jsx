export default function Log({turns}) {
    const log =[]
    for (const turn of turns) {
        const {square, player} = turn;
        const { row, col } = square;

        log.push(<li>{`Player ${player} sets ${row} and ${col}`}</li>)
    }

    return <ol id="log">
        {turns.map(turn =>
            ( <li key={`${turn.square.row}_${turn.square.col}` }>
                {turn.player} selected {turn.square.row}, {turn.square.col}
            </li>))}
    </ol>
}
