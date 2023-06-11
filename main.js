const wins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const container = document.querySelector(".js-content");
const winnerPlayer = document.querySelector(".js-winner")
let player = "X";
let historyX = [];
let historyO = [];

function createMarkup() {
  let markup = "";
  for (let i = 1; i < 10; i += 1) {
    markup += `<div class="item js-item" data-id="${i}"></div>`;
  }

  container.innerHTML = markup;
}
createMarkup();
container.addEventListener("click", onClick);

function onClick(event) {
  const { target } = event;
  if (!target.classList.contains("js-item") || target.textContent) {
    return;
  }
  let result = false;

  const id = Number(target.dataset.id);
  if (player === "X") {
    historyX.push(id);
    result = isWinner(historyX);
  } else {
    historyO.push(id);
    result = isWinner(historyO);
  }

  target.textContent = player;
  player = player === "X" ? "O" : "X";

  if (result) {
    winnerPlayer.textContent = `Winner is ${player}`;
    resetGame();
    return;
  } else if (historyX.length + historyO.length === 9) {
    console.log(`No one has won! Try again!`);
    resetGame();
    return;
  }
}

function isWinner(array) {
  return wins.some((item) => item.every((id) => array.includes(id)));
}

function resetGame() {
  createMarkup();
  historyX = [];
  historyO = [];
  player = "X";
}
