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

  currentPlayerDisplay.innerHTML =
    "Jogador atual: " + currentPlayer.toUpperCase();

  let winner = checkGameState(board);

  if (winner) {
    currentPlayer = "";
    currentPlayerDisplay.innerHTML = "";
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

function checkGameState(board) {
  let emptySpaces = 0;
  for (let value of board) {
    if (value === "") {
      emptySpaces++;
    }
  }

  let winner = checkWinner(board);
  if (winner) {
    gameResult.innerHTML = "O vencedor é " + winner.toUpperCase();
    return winner;
  }
  if (emptySpaces === 0) {
    gameResult.innerHTML = "Empate";
    return "end";
  }
  return "continue";
}

function checkWinner(board) {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] != "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
}

function miniMax(board) {
  // 1. Verificar se o estado atual já terminou
  // 2. Encontrar todas as jogadas possíveis
  // 3. Para cada jogada possível:
  // simular a jogada
  // simular a melhor resposta do adversário
  // (chamar minimax novamente)
  // desfazer a jogada
  // 4. Comparar os resultados das simulações
  // 5. Retornar o melhor resultado
}
