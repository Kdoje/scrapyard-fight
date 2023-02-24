import { useState } from "react";

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// this is a parent component, state should always flow down not up, so if we want move history,
// we need something that tracks a set of boards, hence the game component
export default function Game() {
    // we refactor the Board component to create a Game component to store a history of moves, and pass them back down to the board to
    // render state
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
   
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const moves = history.map((squares, moveIndex) => {
        let description;
        if (moveIndex > 0) {
            description = 'Go to move #' + moveIndex;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={moveIndex}>
                <button onClick={() => jumpTo(moveIndex)}>{description}</button>
            </li>
        );
    });


    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    return (
        <div className="game">
            <div className="game-board"><Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /></div>
            <ol>{moves}</ol>
        </div>
    )
}

type BoardProps = {
    xIsNext: boolean
    squares: string[]
    onPlay: (arg: string[]) => void
}

// this is a component. It renders, manages and updates the associated UI in the app
function Board(props: BoardProps) {
    // we define another state variable to track whose turn it is
    let status = "";

    // game status should be updated each time the board is rendered so we make 
    // it's own function here
    function updateGameStatus(nextSquares: string[]) {
        let winner = calculateWinner(nextSquares);
        if (calculateWinner(nextSquares)) {
            status = "winner: " + winner;
        } else {
            let nextTurn = props.xIsNext;
            const nextPlayer = nextTurn ? "X" : "O";
            status = "It's " + nextPlayer + "'s turn";
        }
    }

    // this function takes the board index and updates the square with an `X`
    function handleClick(i: number) {
        // copy state so we can store it for later
        const nextSquares = props.squares.slice();

        // determine if someone has already won otherwise, advance the turn
        let winner = calculateWinner(nextSquares);
        if (nextSquares[i] || winner) {
            return;
        }

        if (props.xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        props.onPlay(nextSquares);
    }

    // check if someone has won after the latest move and say so
    updateGameStatus(props.squares);
    // render the current state of the board
    return (
        
        // this `<>` and `</>` means return a fragment. Because each function can only return one component, we use
        // fragments to group them together
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {/* we create a function that takes no args and simply calls handle click on the 
                given board index so we can update the state. Because onSquareClick wants a function, we need to 
                pass a function in here. */}
                <Square value={props.squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={props.squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={props.squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={props.squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={props.squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={props.squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={props.squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={props.squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={props.squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>);
}

// in typescript land we need to define props passed a component as a type so the compiler knows what data needs 
// to be sent to the component
type SquareProps = {
    value: string
    onSquareClick: () => void
}

// we define a reusable square component here to update each square in the board with the
// the appropriate symbol when clicked
function Square(props: SquareProps) {

    return <button className="square" onClick={props.onSquareClick}>{props.value}</button>;
}