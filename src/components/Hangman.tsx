import React, { useState, useEffect } from 'react';
import '../App.css';

const WORDS = [
  'react', 'hangman', 'apple', 'banana', 'grape', 'orange', 'strawberry', 'blueberry',
  'mango', 'kiwi', 'peach', 'pear', 'pineapple', 'watermelon', 'cherry', 'lemon',
  'lime', 'coconut', 'apricot', 'pomegranate', 'blackberry', 'raspberry', 'plum',
  'papaya', 'melon', 'fig', 'date', 'guava', 'clementine', 'tangerine', 'nectarine',
  'passionfruit', 'cranberry', 'dragonfruit', 'jackfruit', 'honeydew', 'soursop',
  'durian', 'lychee', 'persimmon', 'rhubarb', 'pistachio', 'cashew', 'walnut',
  'almond', 'hazelnut', 'chestnut', 'peanut', 'cocoa', 'tea', 'coffee', 'sugar',
];

const maxLives = 6;

function App() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [userGuess, setUserGuess] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setUserGuess('');
  };

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameOver) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);

      if (wrongGuesses + 1 === maxLives) {
        setGameOver(true);
      }
    } else {
      if (word.split('').every((l) => guessedLetters.includes(l) || l === letter)) {
        setGameWon(true);
        setGameOver(true);
      }
    }
  };

  const handleWordGuess = (event: React.FormEvent) => {
    event.preventDefault();

    if (userGuess.toLowerCase() === word) {
      setGameWon(true);
      setGameOver(true);
    } else {
      setWrongGuesses(maxLives);
      setGameOver(true);
    }

    setUserGuess('');
  };

  const renderWord = () => {
    return word.split('').map((letter, i) => (
      <span key={i} className="letter">
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
    ));
  };

  const renderHangman = () => {
    const hangmanParts = [
      <circle key="head" cx="80" cy="33" r="10" stroke="white" strokeWidth="3" fill="none" />,
      <line key="body" x1="80" y1="41" x2="80" y2="70" stroke="white" strokeWidth="3" />,
      <line key="left-arm" x1="80" y1="50" x2="65" y2="45" stroke="white" strokeWidth="3" />,
      <line key="right-arm" x1="80" y1="50" x2="95" y2="45" stroke="white" strokeWidth="3" />,
      <line key="left-leg" x1="80" y1="70" x2="65" y2="85" stroke="white" strokeWidth="3" />,
      <line key="right-leg" x1="80" y1="70" x2="95" y2="85" stroke="white" strokeWidth="3" />,
    ];

    return (
      <svg height="120" width="100" className="hangman">
        {hangmanParts.slice(0, wrongGuesses)}
        <line x1="10" y1="100" x2="90" y2="100" stroke="white" strokeWidth="3" />
        <line x1="50" y1="10" x2="50" y2="100" stroke="white" strokeWidth="3" />
        <line x1="50" y1="10" x2="80" y2="10" stroke="white" strokeWidth="3" />
        <line x1="80" y1="10" x2="80" y2="25" stroke="white" strokeWidth="3" />
      </svg>
    );
  };

  const renderGameStatus = () => {
    if (gameWon) {
      return <h2>You Win!</h2>;
    }
    if (gameOver) {
      return <h2>Game Over! The word was: {word}</h2>;
    }
    return null;
  };

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <div className="game-container"> {/* New container for centering */}
        {renderHangman()}
        <div className="word">{renderWord()}</div>
        <div className="keyboard">
          {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || gameOver}
            >
              {letter}
            </button>
          ))}
        </div>
        <form onSubmit={handleWordGuess}>
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Guess the word"
            maxLength={word.length}
            style={{ marginTop: '20px', padding: '5px', fontSize: '16px' }}
          />
          <button type="submit">Submit Guess</button>
        </form>
        {renderGameStatus()}
        <h3>Wrong guesses: {wrongGuesses} / {maxLives}</h3>
        <button onClick={resetGame} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
