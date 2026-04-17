const cells = document.querySelectorAll(".cell");
const newGameBtn = document.getElementById("newgame");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const drawScoreEl = document.getElementById("drawScore");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

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

function updateButton() {
  newGameBtn.classList.remove("x", "o", "default");

  if (!gameActive) {
    newGameBtn.textContent = "New Game";
    newGameBtn.classList.add("default");
  } else {
    newGameBtn.textContent = "Player : " + currentPlayer;
    newGameBtn.classList.add(currentPlayer.toLowerCase());
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    gameActive = false;

    if (currentPlayer === "X") {
      xScore++;
      xScoreEl.textContent = xScore;
    } else {
      oScore++;
      oScoreEl.textContent = oScore;
    }

    updateButton();
    setTimeout(() => alert(currentPlayer + " wins!"), 100);
    return;
  }

  if (!board.includes("")) {
    drawScore++;
    drawScoreEl.textContent = drawScore;
    gameActive = false;

    updateButton();
    setTimeout(() => alert("Draw!"), 100);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateButton();
}

function checkWinner() {
  return winPatterns.some(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
  );
}

newGameBtn.addEventListener("click", resetGame);

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });

  updateButton();
}

updateButton();
