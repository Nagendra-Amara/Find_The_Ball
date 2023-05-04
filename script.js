const cups = ['A', 'B', 'C'];
let ballPosition;
let messageElem;

document.addEventListener('DOMContentLoaded', function() {
	messageElem = document.getElementById('message');
	
	// Add event listeners to cups
	document.getElementById('cupA').addEventListener('click', function() {
		checkGuess(0);
	});
	document.getElementById('cupB').addEventListener('click', function() {
		checkGuess(1);
	});
	document.getElementById('cupC').addEventListener('click', function() {
		checkGuess(2);
	});

	// Add event listener to new game button
	document.getElementById('newGameBtn').addEventListener('click', startNewGame);

	// Start the game
	startNewGame();
});

function startNewGame() {
	// Hide message
	messageElem.classList.add('hidden');

	// Randomly place ball under one of the cups
	ballPosition = Math.floor(Math.random() * 3);

	// Reset cup colors
	document.getElementById('cupA').style.backgroundColor = '';
	document.getElementById('cupB').style.backgroundColor = '';
	document.getElementById('cupC').style.backgroundColor = '';
}

function checkGuess(guess) {
	// Change color of guessed cup
	document.getElementById(`cup${cups[guess]}`).style.backgroundColor = 'green';

	// Show message
	if (guess === ballPosition) {
		messageElem.textContent = 'Congratulations! You found the ball!';
	} else {
		messageElem.textContent = `Sorry, the ball was under cup ${cups[ballPosition]}.`;
	}
	messageElem.classList.remove('hidden');
}
