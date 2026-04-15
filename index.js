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
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});
function handleClick(cell, index) {
  if (board[index] !== "" || !gameActive) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWinner()) {
    gameActive = false;
    if (currentPlayer === "X") {
      xScore++;
      xScoreEl.textContent = xScore;
    } else {
      oScore++;
      oScoreEl.textContent = oScore;
    }
    setTimeout(() => alert(currentPlayer + " wins!"), 100);
    return;
  }
  if (!board.includes("")) {
    drawScore++;
    drawScoreEl.textContent = drawScore;
    gameActive = false;
    setTimeout(() => alert("Draw!"), 100);
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}
newGameBtn.addEventListener("click", resetGame);
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => (cell.textContent = ""));
}