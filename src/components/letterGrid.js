import React, { useState, useRef } from 'react';

const createInitialGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for(let j=0;j<cols;j++){
      row.push(['gray',''])
    }
    grid.push(row)
  }
  return grid;
};


const LetterGrid = ({handleWordData}) => {
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
      if (colIndex < cols - 1 && value!=='') {
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

      if(colIndex===cols-1 ){
        const wordData = []
        for(let i=0;i<cols;i++){
          if(grid[rowIndex][i][0]==='green'){
            if(rowIndex+1<rows) grid[rowIndex+1][i]=grid[rowIndex][i];
          }
          wordData.push(grid[rowIndex][i]);
        }

        handleWordData(wordData);
      }
    }
  };

  

  const handleColorChange = (rowIndex, colIndex) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      
      if(newGrid[rowIndex][colIndex][0]==='gray'){
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
    <div className="grid grid-rows-6 gap-1 min-w-[17rem]">
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
                'height': '3rem',
                'width': '3rem',
                'textAlign': 'center',
                'borderWidth': '1px',
                'borderColor': 'black',
                'borderStyle': 'solid',
                'borderRadius': '0.25rem',
                'marginLeft': '0.150rem',
                'marginRight': '0.150rem',
                'textTransform': 'uppercase'
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
