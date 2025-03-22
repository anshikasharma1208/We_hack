import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../lottie/workmemora.json";
import "./PomodoroStyles.css"; // Custom Styles

const motivationalQuotes = {
  "Focus Time": [
    "Stay focused, the results will follow!",
    "Hard work beats talent when talent doesn't work hard.",
    "Discipline is choosing between what you want now and what you want most."
  ],
  "Break Time": [
    "Relax and recharge! You've earned it.",
    "A short break now boosts productivity later.",
    "Don't forget to breathe and smile!"
  ]
};

const PomodoroCharacter = ({ session }) => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote from the session type
    const randomQuote = motivationalQuotes[session][Math.floor(Math.random() * motivationalQuotes[session].length)];
    setQuote(randomQuote);
  }, [session]);

  return (
    <div className="character-section">
      <Lottie animationData={animationData} className="character-animation" />
      <div className="quote-box">{quote}</div>
    </div>
  );
};

export default PomodoroCharacter;
