function Feedback({ status, lastResult, secret, tries }) {
  let text = "I'm thinking of a number. Can you find it?";
  let tone = "idle";

  if (status === "won") {
    text = `🎉 Correct! The number was ${secret}. You got it in ${tries} ${tries === 1 ? "try" : "tries"}.`;
    tone = "win";
  } else if (status === "lost") {
    text = `😞 Game over! The number was ${secret}. Better luck next time.`;
    tone = "lose";
  } else if (lastResult === "close") {
    text = "🔥 So close! You're almost there.";
    tone = "close";
  } else if (lastResult === "far") {
    text = "❄️ Way off. Try a very different number.";
    tone = "far";
  }

  return (
    <div className={`feedback ${tone}`} role="status" aria-live="polite">
      {text}
    </div>
  );
}

export default Feedback;