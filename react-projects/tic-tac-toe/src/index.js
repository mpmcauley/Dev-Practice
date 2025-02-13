import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square Component
const Square = props => {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}


// Board Component
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => {this.props.onClick(i)}}
      />
    )
  }
  renderBoard(rows, columns) {
    const table = [];
    let rowArr = [];
    const boardArr = [];
    for (let row=0; row<rows; row++) {
      for (let column=0; column< columns; column++) {
        let coordinate = 3 * row + column;
        let square = this.renderSquare(coordinate);
        rowArr.push(square);
      }
      boardArr.push(rowArr);
      rowArr = [];
      table.push(<div key={`row_${row}`}className="board-row">{boardArr[row]}</div>);
    }
    return table;
  }
  render() {
    return (
      <div>
        {this.renderBoard(3,3)}
      </div>
    );
  }
}


// Game Component
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // caculates coordinates
    const coordinates = `(${i % 3}, ${Math.floor(i/3)})`;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: coordinates,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      `Go to move #${move} - ${history[move].location}` :
      `Go to game start`;
      // calculates the last move -> this will effect styling
      const lastMove = history.length - 1 === move;
      return (
        <li key={move}>
          <button style={lastMove ? {fontWeight: 'bold'} : {}}onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {this.handleClick(i)}}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}


//calculateWinner funtion
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
