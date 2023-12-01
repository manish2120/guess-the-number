let randomNumber = parseInt(Math.random() * 100 + 1);

let userInput = document.querySelector("#inputValue");
let submit = document.querySelector("#subt");
let guessSection = document.querySelector("#guessSection");
let prevGuesses = document.querySelector(".prevGuesses");
let remaining = document.querySelector(".remainingGuesses");
let resultOutput = document.querySelector("#resultOutput");

let newStartBtn = document.createElement("p");

let prevGuessSlot = [];
let numGuess = 1;

let playGame = true;

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (playGame) {
    let guess = parseInt(userInput.value);
    checkInput(guess);
  }

  function checkInput(guess) {
    if (isNaN(guess)) {
      alert("Please enter only a number");
    } else if (guess < 1) {
      alert("Please enter a number between 1 to 100");
    } else if (guess > 100) {
      alert("Please enter a number between 1 to 100");
    } else {
      if (numGuess === 11) {
        displayMessage("Game Over! No attempts remaining");
        endGame();
      } else {
        checkGuess(guess);
      }
    }
  }

  function checkGuess(guess) {
    if (guess === randomNumber) {
      displayMessage("You Won, You guessed a right number");
    } else if (guess < randomNumber) {
      displayMessage("Number is too low");
    } else if (guess > randomNumber) {
      displayMessage("Number is too high");
    }
    prevGuessSlot.push(guess);
    displayGuesses(guess);
  }

  function displayMessage(message) {
    resultOutput.innerHTML = `<h3>${message}</h3>`;
  }

  function displayGuesses(guess) {
    userInput.value = "";
    prevGuesses.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
  }

  function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    newStartBtn.innerHTML = '<button id="startAgain">Start New Game</button>';
    newStartBtn.classList.add("startGameBtn");
    guessSection.appendChild(newStartBtn);
    playGame = false;
    startNewGame();
  }

  function startNewGame() {
    const newStart = document.getElementById("startAgain");
    newStart.addEventListener("click", function () {
      userInput.removeAttribute("disabled", "");
      numGuess = 1;
      remaining.innerHTML = `${11 - numGuess}`;
      prevGuesses.innerHTML = "";
      guessSection.removeChild(newStartBtn);
      displayMessage("");
      randomNumber = parseInt(Math.random() * 100 + 1);
      playGame = true;
    });
  }
});
