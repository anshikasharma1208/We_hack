import React, { useState, useEffect } from "react";
import PomodoroCharacter from "./PomodoroCharacter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PomodoroStyles.css"; // Custom Dark Theme Styles

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState("Focus Time");

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleSessionEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionEnd = () => {
    if (session === "Focus Time") {
      setSession("Break Time");
      setTime(5 * 60); // 5-minute break
    } else {
      setSession("Focus Time");
      setTime(25 * 60); // 25-minute focus
    }
    setIsRunning(false);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-box">
        <h1 className="session-title">{session}</h1>
        <div className="timer-display">{formatTime(time)}</div>
        <div className="button-group">
          <button className="btn btn-success" onClick={handleStartStop}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="btn btn-danger" onClick={handleSessionEnd}>
            Skip
          </button>
        </div>
      </div>

      {/* Character and Quote Section */}
      <PomodoroCharacter session={session} />
    </div>
  );
};

export default PomodoroTimer;
