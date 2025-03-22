import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./flashcardlist.css";
import Flashcard from "./flashcard";
import Sidebar from "../sidebar/sidebar";

const FlashcardList = () => {
  // Hardcoded flashcards
  const [cards, setCards] = useState([
    { id: 1, content: "What is a model's ability to generalize?", answer: "Overfitting" },
    { id: 2, content: "What algorithm minimizes a loss function in machine learning?", answer: "Gradient Descent" },
    { id: 3, content: "What type of learning uses labeled data?", answer: "Supervised" },
    { id: 4, content: "What is the chemical symbol for water?", answer: "H2O" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = () => {
    setFlipped(false);
    setDifficulty(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handleFlag = async (level) => {
    setDifficulty(level);
    if (cards.length > 0) {
      const flashcardId = cards[currentIndex].id;
      console.log(`Flashcard ${flashcardId} flagged as ${level}`);
    }
  };

  return (
    <div className="flashcard-container">
      <Sidebar />
      {cards.length > 0 ? (
        <Flashcard 
          question={cards[currentIndex].content} 
          answer={cards[currentIndex].answer} 
          flipped={flipped}
          onFlip={handleFlip}
        />
      ) : (
        <p>Loading flashcards...</p>
      )}

      <div className="buttons-container">
        <button className={`flag-button ${difficulty === "Easy" ? "easy" : ""}`} onClick={() => handleFlag("Easy")}>
          Easy
        </button>
        <button className={`flag-button ${difficulty === "Medium" ? "medium" : ""}`} onClick={() => handleFlag("Medium")}>
          Medium
        </button>
        <button className={`flag-button ${difficulty === "Hard" ? "hard" : ""}`} onClick={() => handleFlag("Hard")}>
          Hard
        </button>
      </div>
      <button className="next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default FlashcardList;
