import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import LetterGrid from './components/letterGrid';
import Table from './components/table';
import wordleSolver from './algo/wordleAlgo';

const App = () => {

  const [wordsList, setWordsList] = useState([])

  const handleWordData = (wordData) => {
    const updatedWordsList = wordleSolver(wordData);
    setWordsList(updatedWordsList);
  };

  useEffect(() => {
    handleWordData([]);
  },[])

  return (
    <div className='min-w-[20rem]'>
      <Header />

      <main className='py-6 px-20 flex flex-row flex-wrap justify-between gap-4'>
        <div><LetterGrid handleWordData={handleWordData}/></div>
        <Table wordsList={wordsList}/>
      </main>
    </div>
  );
}

export default App;
