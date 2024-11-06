import React, { useState } from 'react';
import './Wordle.css';

const WORD = "Skibi"; 
const MAX_ATTEMPTS = 6; 

const Wordle: React.FC = () => {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState<string[][]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value.toUpperCase());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (guess.length !== WORD.length || status !== "playing") return;

    const attempt = guess.split("").map((char, i) => {
      if (char === WORD[i]) return "correct";
      if (WORD.includes(char)) return "present";
      return "absent";
    });

    setAttempts([...attempts, attempt]);
    setGuess("");

    if (guess === WORD) {
      setStatus("won");
    } else if (attempts.length + 1 === MAX_ATTEMPTS) {
      setStatus("lost");
    }
  };

  return (
    <div className="wordle">
      <h1>Wordle</h1>
      <div className="board">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
          <div className="row" key={i}>
            {(attempts[i] || Array(WORD.length).fill("")).map((status, j) => (
              <div className={`cell ${status}`} key={j}>
                {attempts[i] ? guess[j] : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      {status === "playing" ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            maxLength={WORD.length}
            disabled={status !== "playing"}
          />
          <button type="submit" disabled={guess.length !== WORD.length}>
            Submit
          </button>
        </form>
      ) : (
        <p className="result">
          {status === "won" ? "Congratulations! You guessed the word!" : `Game Over! The word was ${WORD}`}
        </p>
      )}
    </div>
  );
};

export default Wordle;
