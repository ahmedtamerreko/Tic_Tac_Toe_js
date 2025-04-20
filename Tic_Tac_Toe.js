const button00 = document.querySelector(".zerozero");
const button01 = document.querySelector(".zeroone");
const button02 = document.querySelector(".zerotwo");
const button10 = document.querySelector(".onezero");
const button11 = document.querySelector(".oneone");
const button12 = document.querySelector(".onetwo");
const button20 = document.querySelector(".twozero");
const button21 = document.querySelector(".twoone");
const button22 = document.querySelector(".twotwo");

const buttons = [
  [button00, button01, button02],
  [button10, button11, button12],
  [button20, button21, button22],
];

let turn = 0;
let currentPlayer;
let player1, player2;

let GameBoardArray = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"]
];
function reloadAfterthreeSeconds() {
  setTimeout(() => {
    location.reload(); 
  }, 3000); 
}


function Createplayer(name, letter) {
  return { name, letter };
}

function play(letter, i, j) {
  if (GameBoardArray[i][j] === "-") {
    GameBoardArray[i][j] = letter;
  }
}

function iswin() {
  for (let i = 0; i < 3; i++) {
    if (GameBoardArray[i][0] !== "-" &&
        GameBoardArray[i][0] === GameBoardArray[i][1] &&
        GameBoardArray[i][1] === GameBoardArray[i][2]) {
        buttons[i][0].style="background-color: green;"
        buttons[i][1].style="background-color: green;"
        buttons[i][2].style="background-color: green;"
      return true;
    }
  }
  for (let j = 0; j < 3; j++) {
    if (GameBoardArray[0][j] !== "-" &&
        GameBoardArray[0][j] === GameBoardArray[1][j] &&
        GameBoardArray[1][j] === GameBoardArray[2][j]) {
          buttons[0][j].style="background-color: green;"
          buttons[1][j].style="background-color: green;"
          buttons[2][j].style="background-color: green;"
      return true;
    }
  }
  if (GameBoardArray[0][0] !== "-" &&
      GameBoardArray[0][0] === GameBoardArray[1][1] &&
      GameBoardArray[1][1] === GameBoardArray[2][2]) {
        buttons[0][0].style="background-color: green;"
        buttons[1][1].style="background-color: green;"
        buttons[2][2].style="background-color: green;"
    return true;
  }
  if (GameBoardArray[0][2] !== "-" &&
      GameBoardArray[0][2] === GameBoardArray[1][1] &&
      GameBoardArray[1][1] === GameBoardArray[2][0]) {
        buttons[0][2].style="background-color: green;"
        buttons[1][1].style="background-color: green;"
        buttons[2][0].style="background-color: green;"
    return true;
  }
  return false;
}

function isDraw() {
  return GameBoardArray.flat().every(cell => cell !== "-");
}

function handleClick(i, j, button) {
  return function () {
    if (GameBoardArray[i][j] !== "-") return;
    if(currentPlayer===player1){
      button.style="color: red"
    }
    else{
      button.style="color: blue"
    }
    
    button.innerHTML = currentPlayer.letter;
    button.disabled = true;
    play(currentPlayer.letter, i, j);

    if (iswin()) {
      alert(`${currentPlayer.name} wins! 🎉`);
      disableAllButtons();
      reloadAfterthreeSeconds();
      return;
    }

    if (isDraw()) {
      alert("It's a draw!");
      reloadAfterthreeSeconds();
      return;
    }

    turn++;
    currentPlayer = turn % 2 === 0 ? player1 : player2;
  };
}

function disableAllButtons() {
  for (let row of buttons) {
    for (let btn of row) {
      btn.disabled = true;
    }
  }
}
function handleClickwithComputer(i, j, button) {
  return function () {
    if (GameBoardArray[i][j] !== "-") return;
    if(currentPlayer===player1){
      button.style="color: red"
    }
    else{
      button.style="color: blue"
    }
    
    button.innerHTML = currentPlayer.letter;
    button.disabled = true;
    play(currentPlayer.letter, i, j);

    if (iswin()) {
      alert(`${currentPlayer.name} wins! 🎉`);
      disableAllButtons();
      reloadAfterthreeSeconds();
      return;
    }

    if (isDraw()) {
      alert("It's a draw!");
      reloadAfterthreeSeconds();
      return;
    }

    turn++;
    currentPlayer = turn % 2 === 0 ? player1 : player2;
    if(currentPlayer===player2)
    computerplaying();
  };
}
function startGameWithComputer() {
  const name1 = prompt("Type first player name. He will play with X.");
  player1 = Createplayer(name1, "X");
  let name2="Computer";
  player2 = Createplayer(name2, "O");

  currentPlayer = player1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      buttons[i][j].addEventListener("click", handleClickwithComputer(i, j, buttons[i][j]));
    }
  }
}
function startGame() {
  const name1 = prompt("Type first player name. He will play with X.");
  player1 = Createplayer(name1, "X");

  const name2 = prompt("Type second player name. He will play with O.");
  player2 = Createplayer(name2, "O");

  currentPlayer = player1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      buttons[i][j].addEventListener("click", handleClick(i, j, buttons[i][j]));
    }
  }
}
function minimax(board, depth, isMaximizing) {
  const result = getWinner();
  if (result !== null) {
    if (result === player2.letter) return 10 - depth;
    if (result === player1.letter) return depth - 10;
    if (result === "draw") return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "-") {
          board[i][j] = player2.letter;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "-";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "-") {
          board[i][j] = player1.letter;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "-";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
function getWinner() {
  for (let i = 0; i < 3; i++) {
    if (GameBoardArray[i][0] !== "-" &&
        GameBoardArray[i][0] === GameBoardArray[i][1] &&
        GameBoardArray[i][1] === GameBoardArray[i][2]) {
      return GameBoardArray[i][0];
    }
  }

  for (let j = 0; j < 3; j++) {
    if (GameBoardArray[0][j] !== "-" &&
        GameBoardArray[0][j] === GameBoardArray[1][j] &&
        GameBoardArray[1][j] === GameBoardArray[2][j]) {
      return GameBoardArray[0][j];
    }
  }

  if (GameBoardArray[0][0] !== "-" &&
      GameBoardArray[0][0] === GameBoardArray[1][1] &&
      GameBoardArray[1][1] === GameBoardArray[2][2]) {
    return GameBoardArray[0][0];
  }

  if (GameBoardArray[0][2] !== "-" &&
      GameBoardArray[0][2] === GameBoardArray[1][1] &&
      GameBoardArray[1][1] === GameBoardArray[2][0]) {
    return GameBoardArray[0][2];
  }

  if (GameBoardArray.flat().every(cell => cell !== "-")) {
    return "draw";
  }

  return null;
}

function computerplaying() {
 
    let bestScore = -Infinity;
    let move;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (GameBoardArray[i][j] === "-") {
          GameBoardArray[i][j] = player2.letter;
          let score = minimax(GameBoardArray, 0, false);
          GameBoardArray[i][j] = "-";
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
  
    if (move) {
      buttons[move.i][move.j].click();
    }
  }
  
const twoplayers=document.querySelector("#twoPlayers");
twoplayers.addEventListener("click",function(){
  computer.disabled=true;
  this.style.backgroundColor = '#CD5C5C';
  startGame();
}
);
const computer=document.querySelector("#VsComputer");
computer.addEventListener("click",function(){
  twoplayers.disabled=true;
  this.style.backgroundColor = '#CD5C5C';
  startGameWithComputer();
}
);
