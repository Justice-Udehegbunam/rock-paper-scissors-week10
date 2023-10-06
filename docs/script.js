// Initialize the score or retrieve it from local storage
let score = JSON.parse(localStorage.getItem("score"));
if (score == null) {
  score = {
    You: 0,
    Computer: 0,
  };
} else if (
  typeof score.You !== "number" ||
  typeof score.Computer !== "number"
) {
  // Ensure that the retrieved scores are valid numbers
  score = {
    You: 0,
    Computer: 0,
  };
}

// Function to update the score display
function updateScore() {
  document.querySelector(
    ".js-result"
  ).innerHTML = `You: ${score.You}, Computer: ${score.Computer}`;
}

// Function to play the game
function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = "";

  playerMove = playerMove.toLowerCase();

  if (playerMove === computerMove) {
    result = "It's a tie!";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win!";
    score.You += 1;
  } else {
    result = "Computer wins!";
    score.Computer += 1;
  }

  // Update the score display
  updateScore();

  document.querySelector(
    ".js-outcome"
  ).innerHTML = `You picked ${playerMove}, The Computer picked ${computerMove}, result is: ${result}`;

  localStorage.setItem("score", JSON.stringify(score));
}

// Function to pick a random move for the computer
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

// Add event listeners to the buttons
document.getElementById("rock-button").addEventListener("click", function () {
  playGame("rock");
});

document.getElementById("paper-button").addEventListener("click", function () {
  playGame("paper");
});

document
  .getElementById("scissors-button")
  .addEventListener("click", function () {
    playGame("scissors");
  });

// Initial score display
updateScore();
