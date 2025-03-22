import React from "react";
import "./flashcard.css";

const Flashcard = ({ question, answer, flipped, onFlip }) => {
  return (
    <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={onFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{question}</p>
        </div>
        <div className="flashcard-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
