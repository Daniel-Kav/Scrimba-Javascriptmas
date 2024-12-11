// index.js
const emojis = ['🎄', '🎁', '🎅', '☃️'];
const gameBoard = document.getElementById('game-board');
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart Game';
restartButton.addEventListener('click', restartGame);

let points = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Display scores
const scoreContainer = document.createElement('div');
scoreContainer.id = 'score-container';
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score-display';
scoreDisplay.textContent = `Points: ${points} | High Score: ${highScore}`;
scoreContainer.appendChild(scoreDisplay);
document.body.insertBefore(scoreContainer, gameBoard);
document.body.appendChild(restartButton);

// Create a win message container
const winMessage = document.createElement('div');
winMessage.id = 'win-message';
winMessage.textContent = '';
document.body.insertBefore(winMessage, gameBoard);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Create cards
function createBoard() {
  const shuffledEmojis = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5); // Shuffle emojis each time

  gameBoard.innerHTML = ''; // Clear previous board
  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '?'; // Add default question mark
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick(event) {
  if (lockBoard) return; // Prevent interaction during animations

  const clickedCard = event.target;

  // Prevent clicking the same card twice
  if (clickedCard === firstCard || clickedCard.classList.contains('revealed')) {
    return;
  }
 
  revealCard(clickedCard);

  if (!firstCard) {
    // First card clicked
    firstCard = clickedCard;
  } else {
    // Second card clicked
    secondCard = clickedCard;
    checkMatch();
  }
}

function revealCard(card) {
  card.textContent = card.dataset.emoji;
  card.classList.add('revealed');
}

function hideCard(card) {
  card.textContent = '?';
  card.classList.remove('revealed');
}

function checkMatch() {
  lockBoard = true;

  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    markAsMatched();
  } else {
    markAsNoMatch();
  }
}

function markAsMatched() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  points += 10;
  updateScore();
  resetSelection();

  matchedPairs++;
  if (matchedPairs === emojis.length) {
    setTimeout(() => {
      displayWinMessage();
      if (points > highScore) {
        highScore = points;
        localStorage.setItem('highScore', highScore);
      }
    }, 300);
  }
}

function markAsNoMatch() {
  firstCard.classList.add('no-match');
  secondCard.classList.add('no-match');
  points -= 5;
  updateScore();

  setTimeout(() => {
    firstCard.classList.remove('no-match');
    secondCard.classList.remove('no-match');
    hideCard(firstCard);
    hideCard(secondCard);
    resetSelection();
  }, 1000);
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function updateScore() {
  scoreDisplay.textContent = `Points: ${points} | High Score: ${highScore}`;
}

function displayWinMessage() {
  winMessage.textContent = '🎉 Congratulations! You matched all pairs! 🎉';
  winMessage.classList.add('celebrate');
}

function restartGame() {
  points = 0;
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  winMessage.textContent = '';
  winMessage.classList.remove('celebrate');
  updateScore();
  createBoard();
}

// Initialize the game
createBoard();

