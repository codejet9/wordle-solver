import React, { useState, useEffect } from 'react';
import Keyboard from './keyboard';

const createInitialGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(['gray', ''])
    }
    grid.push(row)
  }
  return grid;
};


const LetterGrid = ({ handleWordData }) => {
  const rows = 6;
  const cols = 5;

  const [grid, setGrid] = useState(createInitialGrid(rows, cols));
  var curRow = 0, curCol = -1;

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
  }, [])


  const handleKeyPress = (event) => {

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      curCol = (Math.min(curCol + 1, cols - 1));
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[curRow][curCol][1] = event.key;
        return newGrid;
      });
    }

    else if (event.keyCode === 8) {
      if (curCol < 0) return;

      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[curRow][curCol][1] = '';
        curCol = (Math.max(curCol - 1, -1));
        return newGrid;
      });
    }
    
    else if (event.keyCode === 13) {
      var ok = 1;
      for (let i = 0; i < cols; i++) {
        if (grid[curRow][i][1] === '') ok = 0;
      }
      if (!ok) return;

      const rowNow = curRow;
      curRow=(Math.min(curRow + 1, rows - 1));
      curCol=(-1);

      const wordData = []
      for (let i = 0; i < cols; i++) {
        if (grid[rowNow][i][0] === 'green') {
          if (rowNow + 1 < rows) {
            setGrid(prevGrid => {
              const newGrid = [...prevGrid];
              newGrid[rowNow + 1][i] = newGrid[rowNow][i];
              return newGrid;
            });

          }
        }
        wordData.push(grid[rowNow][i]);
      }

      handleWordData(wordData);
    }

    else if(event.key==='green'){
      const colNow=Math.max(curCol,0);

      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[curRow][colNow][0] = event.key;
        return newGrid;
      });
    }

    else if(event.key==='yellow'){
      const colNow=Math.max(curCol,0);

      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[curRow][colNow][0] = event.key;
        return newGrid;
      });
    }

    else if(event.key==='gray'){
      const colNow=Math.max(curCol,0);

      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[curRow][colNow][0] = event.key;
        return newGrid;
      });
    }
  }

  const handleColorChange = (rowIndex, colIndex) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];

      if (newGrid[rowIndex][colIndex][0] === 'gray') {
        newGrid[rowIndex][colIndex][0] = 'yellow';
      }
      else if (newGrid[rowIndex][colIndex][0] === 'yellow') {
        newGrid[rowIndex][colIndex][0] = 'green';
      }
      else if (newGrid[rowIndex][colIndex][0] === 'green') {
        newGrid[rowIndex][colIndex][0] = 'gray';
      }
      return newGrid;
    });
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className="grid grid-rows-6 gap-1 min-w-[17rem]">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className='flex flex-row'>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleColorChange(rowIndex, colIndex)}
                style={{
                  'backgroundColor': (cell[0] === 'white') ? 'white' : (cell[0] === 'gray') ? '#9CA3AF' : (cell[0] === 'yellow') ? '#FDE047' : '#4ADE80',
                  'height': '3rem',
                  'width': '3rem',
                  'textAlign': 'center',
                  'borderWidth': '1px',
                  'borderColor': 'black',
                  'borderStyle': 'solid',
                  'borderRadius': '0.25rem',
                  'marginLeft': '0.150rem',
                  'marginRight': '0.150rem',
                  'textTransform': 'uppercase',
                  'padding': '0.5rem'
                }}
              >{cell[1]}</div>
            ))}
          </div>
        ))}

      </div>
      <Keyboard  />
    </div>
  );
};

export default LetterGrid;
