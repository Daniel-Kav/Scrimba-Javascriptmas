// index.js
const emojis = ['🎄', '🎁', '🎅', '☃️'];
const gameBoard = document.getElementById('game-board');

// Duplicate and shuffle emojis
const shuffledEmojis = [...emojis, ...emojis]
  .sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Create cards
function createBoard() {
  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
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
  card.textContent = '';
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
  resetSelection();

  matchedPairs++;
  if (matchedPairs === emojis.length) {
    setTimeout(() => alert('Congratulations! You matched all pairs!'), 300);
  }
}

function markAsNoMatch() {
  firstCard.classList.add('no-match');
  secondCard.classList.add('no-match');

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

// Initialize the game
createBoard();
