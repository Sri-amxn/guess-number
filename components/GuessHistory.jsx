import { MAX_ATTEMPTS } from "../src/game";

const LABELS = { correct: "Correct", close: "Close", far: "Far" };

function GuessHistory({ guesses }) {
  return (
    <div className="history">
      <div className="attempts" aria-label={`${guesses.length} of ${MAX_ATTEMPTS} attempts used`}>
        {Array.from({ length: MAX_ATTEMPTS }, (_, i) => (
          <span key={i} className={`dot ${i < guesses.length ? "used" : ""}`} />
        ))}
      </div>

      {guesses.length > 0 && (
        <ul>
          {guesses.map((g, i) => (
            <li key={i} className={g.result}>
              <span className="g-num">{g.value}</span>
              <span className="g-label">{LABELS[g.result]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GuessHistory;