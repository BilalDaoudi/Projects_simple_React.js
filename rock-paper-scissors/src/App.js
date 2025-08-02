import React, { useState } from "react";
import "./App.css";

const choices = ["rock", "paper", "scissors"];

const getResult = (player, computer) => {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
};

const App = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  const handleChoice = (choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(result);

    setScore((prev) => ({
      win: prev.win + (result === "win" ? 1 : 0),
      lose: prev.lose + (result === "lose" ? 1 : 0),
      draw: prev.draw + (result === "draw" ? 1 : 0),
    }));
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="app">
      <h1>Rock Paper Scissors</h1>

      {result ? (
        <div className="result-screen fade-in">
          <div className="hands">
            <div>
              <h3>Player</h3>
              <div className={`hand ${playerChoice}`}></div>
            </div>
            <div>
              <h3>Computer</h3>
              <div className={`hand ${computerChoice}`}></div>
            </div>
          </div>
          <h2>
            {result === "win"
              ? "Congrats, You Won! 🎉"
              : result === "lose"
              ? "You Lost!"
              : "It's a Draw!"}
          </h2>
          <button onClick={reset}>Play Again</button>
        </div>
      ) : (
        <div className="selection fade-in">
          <h2>Select your Weapon</h2>
          <div className="choices">
            {choices.map((choice) => (
              <button key={choice} onClick={() => handleChoice(choice)}>
                <div className={`hand ${choice}`}></div>
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="score">
        <p>Won: {score.win}</p>
        <p>Lost: {score.lose}</p>
        <p>Draw: {score.draw}</p>
      </div>
    </div>
  );
};

export default App;
