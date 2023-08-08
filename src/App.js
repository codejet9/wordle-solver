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

      <main className='pt-20 pb-12 px-6 flex flex-row flex-wrap justify-center gap-10 overflow-x-auto'>
        <div><LetterGrid handleWordData={handleWordData}/></div>
        <div className=' overflow-x-auto'> <Table wordsList={wordsList}/></div>
      </main>
    </div>
  );
}

export default App;
