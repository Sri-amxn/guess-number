import { useState } from "react";
import GuessForm from "/components/GuessForm";
import Feedback from "/components/Feedback";
import GuessHistory from "/components/GuessHistory";
import { MIN, MAX, MAX_ATTEMPTS, randomNumber, checkGuess } from "./game";
import "./App.css";

export default function App() {
  const [secret] = useState(randomNumber); // picked once per game
  const [guesses, setGuesses] = useState([]); // [{ value, result }]

  const lastGuess = guesses[guesses.length - 1];
  const won = lastGuess?.result === "correct";
  const lost = !won && guesses.length >= MAX_ATTEMPTS;
  const gameOver = won || lost;
  const status = won ? "won" : lost ? "lost" : "playing";
  const attemptsLeft = MAX_ATTEMPTS - guesses.length;

  // Event handler: called by the form with a valid number
  const handleGuess = (value) => {
    if (gameOver) return false;
    if (guesses.some((g) => g.value === value)) return false; // repeat, no attempt used

    setGuesses([...guesses, { value, result: checkGuess(value, secret) }]);
    return true;
  };

  // Event handler: start a fresh game
  const handleRestart = () => {
    setSecret(randomNumber());
    setGuesses([]);
  };

  return (
    <div className="page">
      <main className="panel">
        <p className="eyebrow">Number guessing game</p>
        <h1>Guess a number from {MIN} to {MAX}</h1>
        <p className="sub">
          {gameOver
            ? "Round finished."
            : `${attemptsLeft} ${attemptsLeft === 1 ? "attempt" : "attempts"} left`}
        </p>

        <Feedback
          status={status}
          lastResult={lastGuess?.result}
          secret={secret}
          tries={guesses.length}
        />

        <GuessForm onGuess={handleGuess} disabled={gameOver} />
        <GuessHistory guesses={guesses} />

        {gameOver && (
          <button className="btn btn-restart" onClick={handleRestart}>
            Play again
          </button>
        )}
      </main>
    </div>
  );
}