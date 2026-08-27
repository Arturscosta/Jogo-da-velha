let menu = document.querySelector(".menu");
let game = document.querySelector(".game");
let gameResult = document.querySelector(".game-result");
let gameBoard = document.querySelector(".game-board");
let buttons = document.querySelectorAll(".game-button");
let currentPlayerDisplay = document.querySelector(".current-player");
let currentPlayer = "";

let board = ["", "", "", "", "", "", "", "", ""];

function hide(element, id) {
  element.style.display = "none";
  console.log(id);
  jogoLocal(gameBoard);
}

function jogoLocal(element) {
  element.style.display = "grid";
  currentPlayer = firstPlay;
  currentPlayerDisplay.innerHTML =
    "Jogador atual: " + currentPlayer.toUpperCase();
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => makeMove(button));
});

let firstPlay = "x";

function makeMove(button) {
  let dataIndex = button.dataset.index;
  switch (currentPlayer) {
    case "o":
      while (board[dataIndex] == "") {
        console.log("o");
        board[dataIndex] = "o";
        button.textContent = "O";
        currentPlayer = "x";
      }
      break;
    case "x":
      while (board[dataIndex] == "") {
        console.log("x");
        board[dataIndex] = "x";
        button.textContent = "X";
        currentPlayer = "o";
      }
      break;
  }

  currentPlayerDisplay.innerHTML =
    "Jogador atual: " + currentPlayer.toUpperCase();

  let winner = checkWinner();

  if (winner) {
    currentPlayer = "";
    currentPlayerDisplay.innerHTML = "";
    gameResult.innerHTML = "O vencedor é " + winner.toUpperCase();
  }
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  let emptySpaces = 0;
  for (let value of board) {
    if (value === "") {
      emptySpaces++;
    }
  }
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] != "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (emptySpaces === 0) {
    return "Nenhum ganhador";
  }
}
