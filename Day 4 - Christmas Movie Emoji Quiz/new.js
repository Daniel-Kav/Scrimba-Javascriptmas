import { films } from '/data.js';

// DOM elements
const guessInputForm = document.getElementById('guess-input');
const guessInput = document.getElementById('guess-input');
const messageContainer = document.querySelector('.message-container');
const emojiCluesContainer = document.querySelector('.emoji-clues-container');

// Shuffle films array
let shuffledFilms = [...films].sort(() => Math.random() - 0.5);

let state = {
    currentFilmIndex: 0,
    guessesRemaining: 3,
};

// Function to display emoji clues
function displayEmojiClues(film) {
    if (!film) return;
    emojiCluesContainer.innerHTML = film.emoji.join(' ');
    emojiCluesContainer.setAttribute('aria-label', film.ariaLabel);
}

// Function to update the message
function updateMessage(message) {
    messageContainer.textContent = message;
}

// Function to enable/disable form
function setFormState(enabled) {
    guessInput.disabled = !enabled;
    guessInputForm.querySelector('button').disabled = !enabled;
}

// Function to reset state for the next question
function nextQuestion() {
    if (state.currentFilmIndex >= shuffledFilms.length) {
        updateMessage("That's all folks! 🎉");
        setFormState(false); // Disable input when the game is over
        return;
    }

    // Reset guesses and display next film
    state.guessesRemaining = 3;
    const nextFilm = shuffledFilms[state.currentFilmIndex];
    displayEmojiClues(nextFilm);
    updateMessage(`You have ${state.guessesRemaining} guesses remaining.`);
    setFormState(true); // Enable input for the new question
}

// Function to check the player's guess
function checkGuess(event) {
    event.preventDefault();
    const userGuess = guessInput.value.trim().toLowerCase();
    const currentFilm = shuffledFilms[state.currentFilmIndex];

    if (!currentFilm) return;

    const correctAnswer = currentFilm.title.toLowerCase();

    setFormState(false); // Temporarily disable form while processing

    if (userGuess === correctAnswer) {
        updateMessage("Correct! 🎉");
        state.currentFilmIndex++;
        setTimeout(nextQuestion, 3000); // Move to the next question after 3 seconds
    } else {
        state.guessesRemaining--;
        if (state.guessesRemaining > 0) {
            updateMessage(`Incorrect! You have ${state.guessesRemaining} guesses remaining.`);
            setFormState(true); // Re-enable input for another attempt
        } else {
            updateMessage(`The film was "${currentFilm.title}"!`);
            state.currentFilmIndex++;
            setTimeout(nextQuestion, 3000); // Move to the next question after 3 seconds
        }
    }

    // Clear input
    guessInput.value = '';
}

// Initialize the game
function initializeGame() {
    if (shuffledFilms.length === 0) {
        updateMessage("No films available! Please check your data.");
        setFormState(false);
        return;
    }

    nextQuestion();
}

// Event listener for the form
guessInputForm.addEventListener('submit', checkGuess);

const sett = () => {
    alert('clicked submit')
}
sett();
// Start the game
initializeGame();
