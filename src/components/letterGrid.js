import React, { useState, useEffect, useRef } from 'react';

const createInitialGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for(let j=0;j<cols;j++){
      row.push(['white',''])
    }
    grid.push(row)
  }
  return grid;
};


const LetterGrid = () => {
  const rows = 6;
  const cols = 5;

  const [grid, setGrid] = useState(createInitialGrid(rows,cols));
  const inputRefs = useRef([]);

  
  const handleInputChange = (rowIndex, colIndex, event) => {
    const { value } = event.target;
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex][colIndex][1] = value;

      // Move focus to the next cell in the adjacent column
      if (colIndex < cols - 1) {
        inputRefs.current[rowIndex][colIndex + 1].focus();
      }

      return newGrid;
    });
  };

  const handleKeyDown = (rowIndex, colIndex, event) => {
    if(grid[rowIndex][colIndex][1]==='') return;

    if (event.key === 'Enter') {
      if (colIndex === cols - 1 && rowIndex < rows - 1) {
        // If in the last column and not in the last row, move focus to the next row's first cell
        inputRefs.current[rowIndex + 1][0].focus();
      }

      if(colIndex==cols-1 ) handleFunction();
    }
  };

  const handleFunction = () => {
    // Your function logic here when the user hits Enter in the last cell of the grid
    console.log('Function triggered!');
  };

  const handleColorChange = (rowIndex, colIndex) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      
      if(newGrid[rowIndex][colIndex][0]==='white'){
        newGrid[rowIndex][colIndex][0]='gray';
      }
      else if(newGrid[rowIndex][colIndex][0]==='gray'){
        newGrid[rowIndex][colIndex][0]='yellow';
      }
      else if(newGrid[rowIndex][colIndex][0]==='yellow'){
        newGrid[rowIndex][colIndex][0]='green';
      }
      else if(newGrid[rowIndex][colIndex][0]==='green'){
        newGrid[rowIndex][colIndex][0]='gray';
      }
      return newGrid; 
    });
  }

  return (
    <div className="grid grid-rows-6 gap-1">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} >
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="text"
              maxLength={1}
              value={cell[1]}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
              onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
              onClick={() => handleColorChange(rowIndex, colIndex)}
              ref={(input) => {
                inputRefs.current[rowIndex] = inputRefs.current[rowIndex] || [];
                inputRefs.current[rowIndex][colIndex] = input;
              }}
              style={{
                'backgroundColor':(cell[0]==='white') ? 'white' : (cell[0]==='gray') ? '#9CA3AF' : (cell[0]==='yellow') ? '#FDE047' : '#4ADE80',
                'height': '2.5rem',
                'width': '2.5rem',
                'textAlign': 'center',
                'borderWidth': '1px',
                'borderColor': 'black',
                'borderStyle': 'solid',
                'borderRadius': '0.25rem',
                'marginLeft': '0.125rem',
                'marginRight': '0.125rem'
              }}
              // className={`h-10 w-10 text-center border border-gray-900 bg-green-400 rounded mx-0.5`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LetterGrid;
