import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./features.css";

// Data Array - Placed Above the Component
const data = [
  {
    title: "Flashcards",
    subtitle: "Master Concepts with Ease",
    content: "Get ready to rock your memory with AI-powered flashcards that make learning a blast through active recall and spaced repetition! 🧠💥"
  },
  {
    title: "Quiz",
    subtitle: "Test Your Knowledge",
    content: "Dive into interactive quizzes that’ll put your brain to the test and help you learn like a champ! 🏆🤓"
  },
  {
    title: "Voice and Chatbot",
    subtitle: "Your Personalized Study Companion",
    content: "Chat away or use your voice to get instant help from your AI buddy—no hands required! 🎤🤖"
  },
  {
    title: "Calendar Planner",
    subtitle: "Stay Organized and On Track",
    content: "Keep your study game strong with a smart calendar that knows your schedule and helps you stay on top of things! 📅✨"
  },
  {
    title: "Progress Analytics",
    subtitle: "Track and Improve",
    content: "Keep an eye on your learning journey with cool analytics that show off your strengths and where you can level up! 📈🚀"
  }
];

const Feature = () => {
  return (
    <div className="container-fluid mindvault-container text-white py-5">
      <h2 className="text-center fw-bold mb-5">
        <span id="feature" className="gradient-text">Score higher</span> with powerful tools.
      </h2>
      <div className="scroll-container">
        {data.map((item, index) => (
          <div key={index} className="card custom-card text-white">
            <h4 className="fw-bold">{item.title}</h4>
            <p className="text-secondary">{item.subtitle}</p>
            <div className="card-body bg-dark rounded p-3">
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
