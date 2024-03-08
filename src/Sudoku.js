import React, { useState } from 'react';
import './Sudoku.css'; // Assurez-vous de créer ce fichier CSS pour styliser le jeu

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const Sudoku = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (e, row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = e.target.value ? parseInt(e.target.value) : 0;
    setBoard(newBoard);
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
    </div>
  );
};

export default Sudoku;