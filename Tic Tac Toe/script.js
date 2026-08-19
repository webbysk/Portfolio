let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");

let turnO = true; // O starts the game

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Reset the game
const resetGame = () => {
  turnO = true;

  enableBoxes();

  msgContainer.classList.add("hide");
};

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {

    // Place O or X
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    // Prevent clicking the same box again
    box.disabled = true;

    // Check game status
    checkWinner();
  });
});

// Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes and clear them
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Show game result
const showWinner = (winner) => {

  if (winner === "Nobody — It's a Tie!") {
    msg.innerText = "It's a Tie! 🤝";
  } else {
    msg.innerText = `🎉 ${winner} Wins!`;
  }

  msgContainer.classList.remove("hide");

  disableBoxes();
};

// Check for winner or tie
const checkWinner = () => {

  // Check all winning patterns
  for (let pattern of winPatterns) {

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Make sure all three boxes are filled
    if (
      pos1Val !== "" &&
      pos2Val !== "" &&
      pos3Val !== ""
    ) {

      // Check if all three are the same
      if (
        pos1Val === pos2Val &&
        pos2Val === pos3Val
      ) {

        showWinner(pos1Val);

        return;
      }
    }
  }

  // Check for tie
  let allFilled = true;

  for (let box of boxes) {

    if (box.innerText === "") {
      allFilled = false;
      break;
    }
  }

  // If every box is filled and nobody won
  if (allFilled) {
    showWinner("Nobody — It's a Tie!");
  }
};

// New Game button
newGameBtn.addEventListener("click", resetGame);

// Reset Game button
resetBtn.addEventListener("click", resetGame);