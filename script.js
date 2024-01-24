"use strict";

const winScore = 100;

// Selecting elements
const diceElement = document.getElementById("dice");
const rulesElement = document.getElementById("rules");
const toggleRulesBtn = document.getElementById("toggle-rules-btn");

// Player constructor function
function Player(name, position) {
  this.name = name;
  this.score = 0;
  this.currentScore = 0;
  this.isActive = false;
  this.scoreElemet = document.getElementById(`p${position}-score`);
  this.currentScoreElement = document.getElementById(`p${position}-current`);
  this.rollDiceBtn = document.getElementById(`p${position}-roll-dice-btn`);
  this.holdBtn = document.getElementById(`p${position}-hold-btn`);
}

// Create two player objects
const player1 = new Player("Player 1", 1);
const player2 = new Player("Player 2", 2);

// Create an array of players
const players = [player1, player2];

// Initialize the game
const init = function () {
  // Hide the dice
  rulesElement.style.display = "none";

  // Reset player scores and states
  players.forEach((player) => {
    player.score = 0;
    player.currentScore = 0;
    player.currentScoreElement.textContent = player.currentScore;
    player.scoreElemet.textContent = player.score;
    player.isActive = false;
  });

  // Set player 1 as active
  players[0].isActive = true;

  // Hide the die
  diceElement.classList.add("hidden");
};

// Function to toggle the disabled state of roll dice and hold buttons for a player
function toggleButtonDieHold(player) {
  player.rollDiceBtn.disabled = !player.rollDiceBtn.disabled;
  player.holdBtn.disabled = !player.holdBtn.disabled;
}

// Function to simulate rolling a dice and updating the current score
function rollDice() {
  const dieValue = Math.floor(Math.random() * 6) + 1;
  console.log(dieValue);

  diceElement.classList.remove("hidden");
  diceElement.src = `assets/dice-${dieValue}.png`;

  // Check the dice value and update player scores and states accordingly
  // If the player rolls a 1, they score nothing in this turn and it becomes the next player's turn.
  // If the player rolls any other number, it is added to their turn total and the player's turn continues.
  // If a player chooses to 'hold', their turn total is added to their score, and it becomes the next player's turn.

  if (dieValue !== 1 && players[0].isActive) {
    players[0].currentScore += dieValue;
    players[0].currentScoreElement.textContent = players[0].currentScore;
  } else if (dieValue === 1 && players[0].isActive) {
    players[0].currentScore = 0;
    players[0].currentScoreElement.textContent = players[0].currentScore;
    players[0].isActive = false;
    toggleButtonDieHold(players[0]);
    players[1].isActive = true;
    toggleButtonDieHold(players[1]);
  } else if (dieValue !== 1 && players[1].isActive) {
    players[1].currentScore += dieValue;
    players[1].currentScoreElement.textContent = players[1].currentScore;
  } else if (dieValue === 1 && players[1].isActive) {
    players[1].currentScore = 0;
    players[1].currentScoreElement.textContent = players[1].currentScore;
    players[1].isActive = false;
    toggleButtonDieHold(players[1]);
    players[0].isActive = true;
    toggleButtonDieHold(players[0]);
  }
}

// Function to hold the current score
function holdCurrentScore() {
  // Update player scores and states based on the active player
  if (players[0].isActive) {
    players[0].score += players[0].currentScore;
    players[0].scoreElemet.textContent = players[0].score;
    players[0].currentScore = 0;
    players[0].currentScoreElement.textContent = players[0].currentScore;
    players[0].isActive = false;
    toggleButtonDieHold(players[0]);
    players[1].isActive = true;
    toggleButtonDieHold(players[1]);
  } else if (players[1].isActive) {
    players[1].score += players[1].currentScore;
    players[1].scoreElemet.textContent = players[1].score;
    players[1].currentScore = 0;
    players[1].currentScoreElement.textContent = players[1].currentScore;
    players[1].isActive = false;
    toggleButtonDieHold(players[1]);
    players[0].isActive = true;
    toggleButtonDieHold(players[0]);
  }

  // Check if any player has won the game. Using setTimeout to delay the execution of the alert
  if (players[0].score >= winScore) {
    setTimeout(function () {
      alert("Player 1 Wins!");
      init();
    }, 0);
  } else if (players[1].score >= winScore) {
    setTimeout(function () {
      alert("Player 2 Wins!");
      init();
    }, 0);
  }
}

// Function to toggle text visibility
function toggleTextVisibility(element) {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

// Add event listeners to the buttons
// Event listener for the toggle rules button
toggleRulesBtn.addEventListener("click", function () {
  toggleTextVisibility(rulesElement);

  // Change the text of the button
  if (rulesElement.style.display === "none") {
    toggleRulesBtn.textContent = "Show Rules";
  } else {
    toggleRulesBtn.textContent = "Hide Rules";
  }
});

// Event listener for the new game button
document.getElementById("new-game-btn").addEventListener("click", function () {
  // Ask for confirmation
  const isConfirmed = window.confirm(
    "Are you sure you want to start a new game?"
  );

  // If the user confirms, call the init function
  if (isConfirmed) {
    init();
  }
});

// Call the init function to start the game
init();
