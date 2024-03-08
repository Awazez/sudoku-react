import React, { useState } from 'react';
import './Sudoku.css'; // Assurez-vous d'avoir créé ce fichier de styles

const initialBoard = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0]
];

const Sudoku = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (e, row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = e.target.value ? parseInt(e.target.value) : 0;
    setBoard(newBoard);
  };

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(col / 3) + i % 3;
      if (board[row][i] === num || board[i][col] === num || board[m][n] === num) {
        return false;
      }
    }
    return true;
  };

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
                return true;
              } else {
                board[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolveClick = () => {
    const newBoard = JSON.parse(JSON.stringify(board)); // Deep clone to avoid direct state mutation
    if (solveSudoku(newBoard)) {
      setBoard(newBoard);
    } else {
      alert('No solution exists!');
    }
  };

  return (
    <div className="sudoku">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <input 
              key={cellIndex} 
              className="cell" 
              type="number" 
              min="1" 
              max="9" 
              value={cell === 0 ? '' : cell} 
              onChange={(e) => handleChange(e, rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
      <button onClick={handleSolveClick}>Résoudre le Sudoku</button>
    </div>
  );
};

export default Sudoku;