let timeLeft = 1500; // 25 minutes in seconds
let timerInterval;
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const skipButton = document.getElementById("skip");

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Time's up! Take a break.");
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 1500;
    updateTimerDisplay();
}

startButton.addEventListener("click", startTimer);
skipButton.addEventListener("click", resetTimer);

updateTimerDisplay();
