import { useState } from "react";
import { MIN, MAX } from "../src/game";

function GuessForm({ onGuess, disabled }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(value);

    if (value.trim() === "" || !Number.isInteger(num) || num < MIN || num > MAX) {
      setError(`Enter a whole number from ${MIN} to ${MAX}.`);
      return;
    }

    const accepted = onGuess(num); // parent returns false for a repeated guess
    if (accepted === false) {
      setError("You already tried that number.");
      return;
    }
    setError("");
    setValue("");
  };

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <div className="guess-row">
        <input
          type="number"
          min={MIN}
          max={MAX}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`${MIN} - ${MAX}`}
          aria-label={`Your guess, ${MIN} to ${MAX}`}
          disabled={disabled}
        />
        <button className="btn" type="submit" disabled={disabled}>
          Guess
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}

export default GuessForm;