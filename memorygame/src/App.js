import React, { useState, useEffect } from "react";
import "./App.css";

const cardsData = [
  { id: 1, emoji: "🍎" },
  { id: 2, emoji: "🍌" },
  { id: 3, emoji: "🍇" },
  { id: 4, emoji: "🍉" },
  { id: 5, emoji: "🥝" },
  { id: 6, emoji: "🍓" },
];

const shuffleCards = () => {
  const doubled = [...cardsData, ...cardsData];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((card, index) => ({
    ...card,
    uniqueId: index,
    flipped: false,
    matched: false,
  }));
};

function App() {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem("memoryHighScore")) || null
  );

  const handleFlip = (uniqueId) => {
    if (disabled || flippedCards.includes(uniqueId)) return;
    const clickedCard = cards.find(c => c.uniqueId === uniqueId);
    if (clickedCard.matched) return;

    const newFlipped = [...flippedCards, uniqueId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setTurns((prev) => prev + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.uniqueId === firstId);
      const secondCard = cards.find(c => c.uniqueId === secondId);

      if (firstCard.id === secondCard.id) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id ? { ...c, matched: true } : c
            )
          );
          setFlippedCards([]);
          setDisabled(false);
        }, 800);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 1200);
      }
    }
  };

  useEffect(() => {
    if (cards.every(c => c.matched)) {
      if (highScore === null || turns < highScore) {
        setHighScore(turns);
        localStorage.setItem("memoryHighScore", turns);
        alert(`🎉 Nouveau meilleur score : ${turns} coups`);
      } else {
        alert(`🎮 Partie terminée ! Coups : ${turns}`);
      }
    }
  }, [cards]);

  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setTurns(0);
    setDisabled(false);
  };

  return (
    <div className="game-container">
      <h1>Jeu de Mémoire 🧠</h1>
      <p>Nombre de coups : {turns}</p>
      <p>Meilleur score : {highScore !== null ? highScore : "-"}</p>

      <div className="card-grid">
        {cards.map((card) => {
          const isFlipped =
            flippedCards.includes(card.uniqueId) || card.matched;

          return (
            <div
              key={card.uniqueId}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleFlip(card.uniqueId)}
            >
              <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        🔄 Recommencer
      </button>
    </div>
  );
}

export default App;
