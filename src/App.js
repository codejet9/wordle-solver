import './App.css';
import Header from './components/header';
import LetterGrid from './components/letterGrid';

const App = () => {
  return (
    <div className='min-w-[20rem]'>
      <Header />

      <main className='p-6'>
        <LetterGrid />
      </main>
    </div>
  );
}

export default App;
