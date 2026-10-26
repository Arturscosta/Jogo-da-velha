let menu = document.querySelector(".menu");
let game = document.querySelector(".game");
let gameResult = document.querySelector(".game-result");
let gameBoard = document.querySelector(".game-board");
let buttons = document.querySelectorAll(".game-button");
let currentPlayerDisplay = document.querySelector(".current-player");
let currentPlayer = "";
let firstPlay = "x";
let gameMode = "";

let localButton = document.querySelector("#local");
let computerButton = document.querySelector("#computer");

localButton.addEventListener("click", () => {
  gameMode = "local";
  startGame();
});
computerButton.addEventListener("click", () => {
  gameMode = "computer";
  startGame();
});

let board = ["", "", "", "", "", "", "", "", ""];

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

function hideElement(element) {
  element.style.display = "none";
}

function showCurrentPlayer() {
  currentPlayerDisplay.innerHTML =
    "Jogador atual: " + currentPlayer.toUpperCase();
}

function startGame() {
  hideElement(menu);
  gameBoard.style.display = "grid";
  currentPlayer = firstPlay;
  showCurrentPlayer();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameMode === "local") {
      makeMove(button);
    }
    if (gameMode === "computer" && currentPlayer === "x") {
      makeMove(button);
    }
  });
});

function makeMove(button) {
  let dataIndex = button.dataset.index;
  playMove(dataIndex, button);
}

function playMove(dataIndex, button) {
  switch (currentPlayer) {
    case "o":
      if (board[dataIndex] == "") {
        console.log("o");
        board[dataIndex] = "o";
        button.textContent = "O";
        currentPlayer = "x";
      }
      break;
    case "x":
      if (board[dataIndex] == "") {
        console.log("x");
        board[dataIndex] = "x";
        button.textContent = "X";
        currentPlayer = "o";
      }
      break;
  }
  checkGameState(board);
  if (gameMode === "computer" && currentPlayer === "o") {
    playComputerTurn();
  }
  showCurrentPlayer();
  checkGameState(board);
}

function playComputerTurn() {
  let move = chooseComputerMove(board);

  console.log("Jogada escolhida:", move);
  console.log("Tabuleiro:", board);
  console.log("Botão:", buttons[move]);

  board[move] = "o";
  buttons[move].textContent = "O";
  currentPlayer = "x";
}

function checkGameState(board) {
  let winner = checkWinner(board);
  if (winner === "x" || winner === "o") {
    gameResult.innerHTML = "O vencedor é " + winner.toUpperCase();
    currentPlayer = "";
    currentPlayerDisplay.innerHTML = "";
    return winner;
  }
  if (winner === "draw") {
    gameResult.innerHTML = "Empate";
    currentPlayer = "";
    currentPlayerDisplay.innerHTML = "";
    return "end";
  }
  return null;
}

function checkWinner(board) {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] != "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  let emptySpaces = 0;
  for (let value of board) {
    if (value === "") {
      emptySpaces++;
    }
  }

  if (emptySpaces === 0) {
    return "draw";
  }
}

function getAvailableMoves(board) {
  let moves = [];

  for (let x = 0; x < board.length; x++) {
    if (board[x] === "") {
      moves.push(x);
    }
  }

  return moves;
}

function evaluateBoard(board) {
  let winner = checkWinner(board);

  if (winner === "o") {
    return 1;
  }

  if (winner === "x") {
    return -1;
  }

  if (winner === "draw") {
    return 0;
  }

  return null;
}

function chooseComputerMove(board) {
  let availableMoves = getAvailableMoves(board);
  let bestScore = -Infinity;
  let bestMove = null;

  for (let move = 0; move < availableMoves.length; move++) {
    let simulatedBoard = [...board];
    simulatedBoard[availableMoves[move]] = "o";

    let score = miniMax(simulatedBoard, "x");

    if (score > bestScore) {
      bestScore = score;
      bestMove = availableMoves[move];
    }
  }

  return bestMove;
}

function miniMax(board, player) {
  let result = evaluateBoard(board);

  if (result !== null) {
    return result;
  }

  let availableMoves = getAvailableMoves(board);

  let bestScore = player === "o" ? -Infinity : Infinity;

  for (let move = 0; move < availableMoves.length; move++) {
    let simulatedBoard = [...board];
    simulatedBoard[availableMoves[move]] = player;

    let nextPlayer = player === "o" ? "x" : "o";
    let score = miniMax(simulatedBoard, nextPlayer);

    if (player === "o") {
      bestScore = Math.max(bestScore, score);
    } else {
      bestScore = Math.min(bestScore, score);
    }
  }

  return bestScore;
}
