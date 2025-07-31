import React, { useState, useEffect } from "react";

const cardsData = [
  { id: 1, emoji: "🍎" },
  { id: 2, emoji: "🍌" },
  { id: 3, emoji: "🍇" },
  { id: 4, emoji: "🍉" },
  { id: 5, emoji: "🥝" },
  { id: 6, emoji: "🍓" },
];

// Double les cartes et mélange
const shuffleCards = () => {
  const doubled = [...cardsData, ...cardsData];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((card, index) => ({ ...card, uniqueId: index, flipped: false, matched: false }));
};

export default function MemoryGame() {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]); // contient uniqueId des cartes retournées
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem("memoryHighScore")) || null
  );

  // Fonction pour retourner une carte
  const handleFlip = (uniqueId) => {
    if (disabled) return; // empêche clic pendant vérification
    if (flippedCards.includes(uniqueId)) return; // pas la même carte 2x
    if (cards.find(c => c.uniqueId === uniqueId).matched) return; // pas retourner une carte déjà matchée

    const newFlipped = [...flippedCards, uniqueId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setTurns(t => t + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.uniqueId === firstId);
      const secondCard = cards.find(c => c.uniqueId === secondId);

      if (firstCard.id === secondCard.id) {
        // Match trouvé
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id ? { ...c, matched: true } : c
            )
          );
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);
      } else {
        // Pas match, on retourne les cartes après un délai
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 1500);
      }
    }
  };

  // Vérifie si partie terminée
  useEffect(() => {
    if (cards.every(c => c.matched)) {
      // Game finished
      if (highScore === null || turns < highScore) {
        setHighScore(turns);
        localStorage.setItem("memoryHighScore", turns);
        alert(`Bravo ! Nouveau meilleur score : ${turns} coups`);
      } else {
        alert(`Partie terminée en ${turns} coups. Meilleur score : ${highScore}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  // Relancer une partie
  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setTurns(0);
    setDisabled(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Jeu de mémoire 🧠</h1>
      <p>Nombre de coups : {turns}</p>
      <p>Meilleur score : {highScore !== null ? highScore : "-"}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 15,
          marginTop: 30,
        }}
      >
        {cards.map((card) => {
          const isFlipped =
            flippedCards.includes(card.uniqueId) || card.matched;

          return (
            <div
              key={card.uniqueId}
              onClick={() => handleFlip(card.uniqueId)}
              style={{
                cursor: "pointer",
                height: 100,
                backgroundColor: isFlipped ? "#4caf50" : "#2196f3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 50,
                borderRadius: 12,
                color: "white",
                userSelect: "none",
                boxShadow: isFlipped
                  ? "0 4px 8px rgba(0, 0, 0, 0.3)"
                  : "0 2px 4px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s ease",
              }}
            >
              {isFlipped ? card.emoji : "❓"}
            </div>
          );
        })}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: 30,
          padding: "12px 25px",
          fontSize: 18,
          cursor: "pointer",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#f44336",
          color: "white",
          boxShadow: "0 4px 10px rgba(244, 67, 54, 0.5)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.target.style.backgroundColor = "#d32f2f")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#f44336")}
      >
        Recommencer
      </button>
    </div>
  );
}
